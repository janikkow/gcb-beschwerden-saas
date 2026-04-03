import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PixelList } from "@/components/pixel-icons";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";

export default function HomeCtaActions() {
  const t = useTranslations("cta");

  return (
    <div className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <GradientButton
        asChild
        className="h-auto min-h-12 w-full rounded-full px-6 py-3 text-center sm:w-auto sm:px-10 sm:py-0"
      >
        <Link href="/demo" className="inline-flex items-center justify-center gap-2.5 text-pretty">
          <PixelList className="h-5 w-5 shrink-0 text-white" />
          {t("demoButton")}
        </Link>
      </GradientButton>
      <Button
        href="/preise"
        variant="cta-secondary"
        className="inline-flex h-auto min-h-12 w-full items-center justify-center gap-2 px-6 py-3 text-center text-base text-pretty sm:w-auto sm:px-8 sm:py-0"
      >
        {t("demoSecondary")}
      </Button>
    </div>
  );
}
