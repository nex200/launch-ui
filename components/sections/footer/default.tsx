import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name,
  columns,
  copyright,
  policies,
  showModeToggle = true,
  className,
}: FooterProps) {
  const t = useTranslations("footer");

  const defaultName = name ?? t("name");
  const defaultColumns =
    columns ?? [
      {
        title: t("columns.product.title"),
        links: [
          { text: t("columns.product.links.changelog"), href: siteConfig.url },
          {
            text: t("columns.product.links.documentation"),
            href: siteConfig.url,
          },
        ],
      },
      {
        title: t("columns.company.title"),
        links: [
          { text: t("columns.company.links.about"), href: siteConfig.url },
          { text: t("columns.company.links.careers"), href: siteConfig.url },
          { text: t("columns.company.links.blog"), href: siteConfig.url },
        ],
      },
      {
        title: t("columns.contact.title"),
        links: [
          { text: t("columns.contact.links.discord"), href: siteConfig.url },
          { text: t("columns.contact.links.twitter"), href: siteConfig.url },
        ],
      },
    ];
  const defaultCopyright = copyright ?? t("copyright");
  const defaultPolicies =
    policies ?? [
      { text: t("policies.privacy"), href: siteConfig.url },
      { text: t("policies.terms"), href: siteConfig.url },
    ];
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{defaultName}</h3>
              </div>
            </FooterColumn>
            {defaultColumns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{defaultCopyright}</div>
            <div className="flex items-center gap-4">
              {defaultPolicies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
