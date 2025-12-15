"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.push(pathname, { locale: newLocale });
      router.refresh();
      setOpen(false);
    });
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Switch language"
        disabled
      >
        <Globe className="size-4" />
        <span className="sr-only">Switch language</span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Switch language"
          disabled={isPending}
        >
          <Globe className="size-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {siteConfig.languages.map((lang: { lang: string; label: string }) => {
          const isActive = lang.lang === locale;
          return (
            <DropdownMenuItem
              key={lang.lang}
              onSelect={() => handleLocaleChange(lang.lang)}
              className={isActive ? "bg-accent" : ""}
            >
              <span className="flex-1">{lang.label}</span>
              {isActive && <span className="ml-2">✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
