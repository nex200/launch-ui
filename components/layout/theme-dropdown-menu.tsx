"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeValue = "light" | "dark" | "system";

interface ThemeOption {
  value: ThemeValue;
  label: string;
  icon: typeof Sun;
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export const ThemeDropdownMenu = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = useMemo<ThemeValue>(() => {
    if (!mounted) return "system";
    if (theme === "light" || theme === "dark" || theme === "system") {
      return theme;
    }
    return "system";
  }, [mounted, theme]);

  const ActiveIcon = useMemo(() => {
    if (!mounted) return Laptop;
    if (currentTheme === "system") {
      if (resolvedTheme === "dark") return Moon;
      if (resolvedTheme === "light") return Sun;
      return Laptop;
    }
    return currentTheme === "dark" ? Moon : Sun;
  }, [currentTheme, mounted, resolvedTheme]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="切换主题"
        >
          <ActiveIcon className="size-4" />
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themeOptions.map((option) => {
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => {
                setTheme(option.value);
                setOpen(false);
              }}
            >
              <span className="flex-1">{option.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

