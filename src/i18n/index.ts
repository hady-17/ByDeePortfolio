import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';
export const dict: Record<Lang, Record<string, string>> = { en, ar };
export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const otherLang = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar');
export const prefixOf = (lang: Lang) => (lang === 'ar' ? '/ar' : '');
/** Path of a page in a language. localePath('ar', '/privacy/') -> '/ar/privacy/' */
export const localePath = (lang: Lang, path = '/') => `${prefixOf(lang)}${path}`;
export const makeT = (lang: Lang) => (key: string): string => dict[lang][key] ?? dict.en[key] ?? '';
