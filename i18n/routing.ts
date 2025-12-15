import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { siteConfig } from "@/config/site";

export const routing = defineRouting({
    locales: siteConfig.locales,
    defaultLocale: "en",
    localePrefix: siteConfig.localePrefix,
    // pathnames: {
    //   '/': '/',
    //   '/pathnames': {
    //     en: '/pathnames',
    //     de: '/pfadnamen'
    //   }
    // }
});

// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
    createNavigation(routing);
