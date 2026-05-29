import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-muted">{t("copyright", { year })}</p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
