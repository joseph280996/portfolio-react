import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-[var(--space-section)] text-center">
      <p className="font-display text-accent" style={{ fontSize: "var(--text-3xl)" }}>
        404
      </p>
      <h1 className="text-ink" style={{ fontSize: "var(--text-2xl)" }}>
        {t("title")}
      </h1>
      <p className="max-w-[var(--content-max)] text-muted">{t("description")}</p>
      <Link href="/" className={buttonClasses("primary", "md")}>
        {t("home")}
      </Link>
    </Container>
  );
}
