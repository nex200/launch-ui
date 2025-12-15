

import { LocalePrefix } from "next-intl/routing";

const languages = [
  { lang: "en", label: "English", hrefLang: "en-US" },
  { lang: "cn", label: "简体中文", hrefLang: "zh-CN" },
];

const localePrefix: LocalePrefix = 'as-needed' as LocalePrefix;

export const siteConfig: any = {
  name: "AIShortV",
  url: process.env.NEXT_PUBLIC_URL,
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  email: `aishortv@outlook.com`,
  localePrefix,
  defaultLocale: "en",
  languages,
  locales: languages.map((lang) => lang.lang),
};

