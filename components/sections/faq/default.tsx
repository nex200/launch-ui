import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title,
  items,
  className,
}: FAQProps) {
  const t = useTranslations("faq");

  const defaultTitle = title ?? t("title");
  const defaultItems: FAQItemProps[] | false =
    items !== false
      ? items ?? [
          {
            question: t("items.critical.question"),
            answer: (
              <>
                <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                  {t("items.critical.answer.p1")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                  {t("items.critical.answer.p2")}
                </p>
              </>
            ),
          },
          {
            question: t("items.noCode.question"),
            answer: (
              <>
                <p className="text-muted-foreground mb-4 max-w-[600px]">
                  {t("items.noCode.answer.p1")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[600px]">
                  {t("items.noCode.answer.p2")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[600px]">
                  {t("items.noCode.answer.p3")}
                </p>
              </>
            ),
          },
          {
            question: t("items.different.question"),
            answer: (
              <>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.different.answer.p1")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.different.answer.p2")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                  {t("items.different.answer.p3")}
                </p>
              </>
            ),
          },
          {
            question: t("items.codeYours.question"),
            answer: (
              <>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.codeYours.answer.p1")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.codeYours.answer.p2")}
                </p>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.codeYours.answer.p3")}{" "}
                  <Link href="/pricing" className="text-foreground underline">
                    {t("items.codeYours.answer.pricingLink")}
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            question: t("items.figma.question"),
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                {t("items.figma.answer.p1")}{" "}
                <Link
                  href="https://www.figma.com/community/file/1420131743903900629/launch-ui-landing-page-components-ui-kit"
                  className="text-foreground underline"
                >
                  {t("items.figma.answer.figmaLink")}
                </Link>
                .
              </p>
            ),
          },
          {
            question: t("items.discount.question"),
            answer: (
              <>
                <p className="text-muted-foreground mb-4 max-w-[580px]">
                  {t("items.discount.answer.p1")}{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline underline-offset-2"
                  >
                    {t("items.discount.answer.email")}
                  </a>
                  .
                </p>
              </>
            ),
          },
        ]
      : false;
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {defaultTitle}
        </h2>
        {defaultItems !== false && defaultItems.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {defaultItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
