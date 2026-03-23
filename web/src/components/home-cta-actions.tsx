import Link from "next/link";
import { PixelList } from "@/components/pixel-icons";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";

export default function HomeCtaActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <GradientButton
        asChild
        className="h-12 rounded-full px-10"
      >
        <Link href="/demo" className="inline-flex items-center gap-2.5">
          <PixelList className="h-5 w-5 text-white" />
          Demo sichern
        </Link>
      </GradientButton>
      <Button
        href="/preise"
        variant="cta-secondary"
        className="inline-flex h-12 items-center gap-2 px-8 text-base"
      >
        Preise ansehen
      </Button>
    </div>
  );
}
