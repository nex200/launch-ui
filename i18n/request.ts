import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that the incoming `locale` is valid
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    // After the check, locale is guaranteed to be a string
    const validLocale = locale as string;

    return {
        locale: validLocale,
        messages: (await (import(`@/messages/${validLocale}.json`))).default,
    };
});
