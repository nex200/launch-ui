import {
  BlocksIcon,
  EclipseIcon,
  FastForwardIcon,
  LanguagesIcon,
  MonitorSmartphoneIcon,
  RocketIcon,
  ScanFaceIcon,
  SquarePenIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { Item, ItemDescription,ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

export default function Items({
  title,
  items,
  className,
}: ItemsProps) {
  const t = useTranslations("items");

  const defaultTitle = title ?? t("title");
  const defaultItems: ItemProps[] | false =
    items !== false
      ? items ?? [
          {
            title: t("items.accessibility.title"),
            description: t("items.accessibility.description"),
            icon: <ScanFaceIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.responsive.title"),
            description: t("items.responsive.description"),
            icon: <MonitorSmartphoneIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.themes.title"),
            description: t("items.themes.description"),
            icon: <EclipseIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.customizable.title"),
            description: t("items.customizable.description"),
            icon: <BlocksIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.performance.title"),
            description: t("items.performance.description"),
            icon: <FastForwardIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.production.title"),
            description: t("items.production.description"),
            icon: <RocketIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.localization.title"),
            description: t("items.localization.description"),
            icon: <LanguagesIcon className="size-5 stroke-1" />,
          },
          {
            title: t("items.cms.title"),
            description: t("items.cms.description"),
            icon: <SquarePenIcon className="size-5 stroke-1" />,
          },
        ]
      : false;
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {defaultTitle}
        </h2>
        {defaultItems !== false && defaultItems.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {defaultItems.map((item, index) => (
              <Item key={index}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
