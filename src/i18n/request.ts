import { getRequestConfig } from 'next-intl/server';
import { chartTypeItems } from '../config/charts';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages: Record<string, any> = {};

  try {
    const globalMod = await import(`../../messages/${locale}.json`);
    Object.assign(messages, globalMod.default || globalMod);

    for (const item of chartTypeItems) {
      const chart = item.href.replace('/charts/', '');
      const mod = await import(
        `../app/[locale]/charts/${chart}/i18n/${locale}.json`
      );
      Object.assign(messages, mod.default || mod);
    }
  } catch (_error) {
    // ignore
  }

  return {
    locale,
    messages,
  };
});
