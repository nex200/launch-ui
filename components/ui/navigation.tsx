"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "../logos/launch-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems,
  components,
  logo = <LaunchUI />,
  logoTitle,
  logoDescription,
  logoHref = siteConfig.url,
  introItems,
}: NavigationProps) {
  const t = useTranslations("navigation");

  const defaultMenuItems: MenuItem[] =
    menuItems ?? [
      {
        title: t("menuItems.gettingStarted"),
        content: "default",
      },
      {
        title: t("menuItems.components"),
        content: "components",
      },
      {
        title: t("menuItems.documentation"),
        isLink: true,
        href: siteConfig.url,
      },
    ];

  const defaultComponents: ComponentItem[] =
    components ?? [
      {
        title: t("components.alertDialog.title"),
        href: "/docs/primitives/alert-dialog",
        description: t("components.alertDialog.description"),
      },
      {
        title: t("components.hoverCard.title"),
        href: "/docs/primitives/hover-card",
        description: t("components.hoverCard.description"),
      },
      {
        title: t("components.progress.title"),
        href: "/docs/primitives/progress",
        description: t("components.progress.description"),
      },
      {
        title: t("components.scrollArea.title"),
        href: "/docs/primitives/scroll-area",
        description: t("components.scrollArea.description"),
      },
      {
        title: t("components.tabs.title"),
        href: "/docs/primitives/tabs",
        description: t("components.tabs.description"),
      },
      {
        title: t("components.tooltip.title"),
        href: "/docs/primitives/tooltip",
        description: t("components.tooltip.description"),
      },
    ];

  const defaultLogoTitle = logoTitle ?? t("logo.title");
  const defaultLogoDescription = logoDescription ?? t("logo.description");

  const defaultIntroItems =
    introItems ?? [
      {
        title: t("introItems.introduction.title"),
        href: siteConfig.url,
        description: t("introItems.introduction.description"),
      },
      {
        title: t("introItems.installation.title"),
        href: siteConfig.url,
        description: t("introItems.installation.description"),
      },
      {
        title: t("introItems.typography.title"),
        href: siteConfig.url,
        description: t("introItems.typography.description"),
      },
    ];
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {defaultMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink ? (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={item.href || ""}>{item.title}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content === "default" ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href={logoHref}
                          >
                            {logo}
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {defaultLogoTitle}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {defaultLogoDescription}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {defaultIntroItems.map((intro, i) => (
                        <ListItem key={i} href={intro.href} title={intro.title}>
                          {intro.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.content === "components" ? (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {defaultComponents.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          data-slot="list-item"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
