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

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((name) => name.endsWith(".mdx"))
      .map(async (name) => {
        const slug = name.replace(/\.mdx$/, "");
        const fullPath = path.join(BLOG_DIR, name);
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
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
  } catch {
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

export function mdxLikeToHtml(body: string): string {
  const lines = body.split("\n");
  const html: string[] = [];
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

    if (trimmed.startsWith("### ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h3>${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h2>${formatInline(trimmed.slice(3))}</h2>`);
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
