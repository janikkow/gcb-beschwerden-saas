import { promises as fs } from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
};

export type BlogHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

const BLOG_BASE = path.join(process.cwd(), "content", "blog");

function blogDir(locale: string) {
  return path.join(BLOG_BASE, locale);
}

function parseFrontmatter(raw: string): Omit<BlogPost, "slug" | "body"> & {
  body: string;
} {
  if (!raw.startsWith("---")) {
    throw new Error("Blogpost fehlt Frontmatter.");
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    throw new Error("Ungueltiges Frontmatter.");
  }

  const metaRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data: Record<string, string> = {};

  for (const line of metaRaw.split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim();
    data[key] = value.replace(/^"|"$/g, "");
  }

  const tagsValue = data.tags ?? "";
  const tags = tagsValue
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);

  return {
    title: data.title ?? "Ohne Titel",
    description: data.description ?? data.excerpt ?? "",
    date: data.date ?? new Date().toISOString(),
    tags,
    body,
  };
}

export async function getAllPosts(locale = "de"): Promise<BlogPost[]> {
  const dir = blogDir(locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    // fallback to DE if locale dir is missing
    files = await fs.readdir(blogDir("de"));
  }

  const posts = await Promise.all(
    files
      .filter((name) => name.endsWith(".mdx"))
      .map(async (name) => {
        const slug = name.replace(/\.mdx$/, "");
        const fullPath = path.join(dir, name);
        const raw = await fs.readFile(fullPath, "utf-8");
        const parsed = parseFrontmatter(raw);

        return {
          slug,
          title: parsed.title,
          description: parsed.description,
          date: parsed.date,
          tags: parsed.tags,
          body: parsed.body,
        };
      }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string, locale = "de"): Promise<BlogPost | null> {
  const dir = blogDir(locale);
  const fullPath = path.join(dir, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(fullPath, "utf-8");
    const parsed = parseFrontmatter(raw);
    return { slug, title: parsed.title, description: parsed.description, date: parsed.date, tags: parsed.tags, body: parsed.body };
  } catch {
    // fallback to DE if EN article doesn't exist yet
    if (locale !== "de") {
      return getPostBySlug(slug, "de");
    }
    return null;
  }
}

function formatInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="blog-link">$1</a>',
    );
}

function plainHeadingText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

function slugifyHeading(text: string) {
  const base = plainHeadingText(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || "section";
}

function uniqueSlug(base: string, used: Map<string, number>) {
  const current = used.get(base) ?? 0;
  const next = current + 1;
  used.set(base, next);
  return current === 0 ? base : `${base}-${next}`;
}

function readHeading(trimmed: string): { level: 2 | 3; text: string } | null {
  if (trimmed.startsWith("### ")) {
    return { level: 3, text: trimmed.slice(4).trim() };
  }
  if (trimmed.startsWith("## ")) {
    return { level: 2, text: trimmed.slice(3).trim() };
  }
  return null;
}

export function extractHeadings(body: string): BlogHeading[] {
  const usedIds = new Map<string, number>();
  const headings: BlogHeading[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    const heading = readHeading(trimmed);
    if (!heading) continue;

    const slug = slugifyHeading(heading.text);
    const id = uniqueSlug(slug, usedIds);

    headings.push({
      id,
      text: plainHeadingText(heading.text),
      level: heading.level,
    });
  }

  return headings;
}

export function mdxLikeToHtml(body: string): string {
  const lines = body.split("\n");
  const html: string[] = [];
  const usedIds = new Map<string, number>();
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }

    const heading = readHeading(trimmed);
    if (heading) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      const slug = slugifyHeading(heading.text);
      const id = uniqueSlug(slug, usedIds);
      const tag = heading.level === 2 ? "h2" : "h3";
      html.push(`<${tag} id="${id}">${formatInline(heading.text)}</${tag}>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h1>${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${formatInline(trimmed.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    html.push(`<p>${formatInline(trimmed)}</p>`);
  }

  if (inList) {
    html.push("</ul>");
  }

  return html.join("\n");
}
