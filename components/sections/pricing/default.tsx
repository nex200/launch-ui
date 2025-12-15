import { User, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface PricingProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
}

export default function Pricing({
  title,
  description,
  plans,
  className = "",
}: PricingProps) {
  const t = useTranslations("pricing");

  const defaultTitle = title ?? t("title");
  const defaultDescription = description ?? t("description");
  const defaultPlans: PricingColumnProps[] | false =
    plans !== false
      ? plans ?? [
          {
            name: t("plans.free.name"),
            description: t("plans.free.description"),
            price: 0,
            priceNote: t("plans.free.priceNote"),
            cta: {
              variant: "glow",
              label: t("plans.free.cta"),
              href: "/docs/getting-started/introduction",
            },
            features: [
              t("plans.free.features.template"),
              t("plans.free.features.blocks"),
              t("plans.free.features.animations"),
            ],
            variant: "default",
            className: "hidden lg:flex",
          },
          {
            name: t("plans.pro.name"),
            icon: <User className="size-4" />,
            description: t("plans.pro.description"),
            price: 149,
            priceNote: t("plans.pro.priceNote"),
            cta: {
              variant: "default",
              label: t("plans.pro.cta"),
              href: "/app/dashboard",
            },
            features: [
              t("plans.pro.features.templates"),
              t("plans.pro.features.blocks"),
              t("plans.pro.features.illustrations"),
              t("plans.pro.features.animations"),
            ],
            variant: "glow-brand",
          },
          {
            name: t("plans.proTeam.name"),
            icon: <Users className="size-4" />,
            description: t("plans.proTeam.description"),
            price: 749,
            priceNote: t("plans.proTeam.priceNote"),
            cta: {
              variant: "default",
              label: t("plans.proTeam.cta"),
              href: "/app/dashboard",
            },
            features: [t("plans.proTeam.features.all")],
            variant: "glow",
          },
        ]
      : false;
  return (
    <Section className={cn(className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {(defaultTitle || defaultDescription) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {defaultTitle && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {defaultTitle}
              </h2>
            )}
            {defaultDescription && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {defaultDescription}
              </p>
            )}
          </div>
        )}
        {defaultPlans !== false && defaultPlans.length > 0 && (
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {defaultPlans.map((plan) => (
              <PricingColumn
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
                price={plan.price}
                priceNote={plan.priceNote}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
