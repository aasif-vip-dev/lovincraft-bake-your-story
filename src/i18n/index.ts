import enUS from './translations/en-US.json';
import enGB from './translations/en-GB.json';
import ta from './translations/ta.json';
import ar from './translations/ar.json';
import hi from './translations/hi.json';
import zh from './translations/zh.json';
import ja from './translations/ja.json';
import de from './translations/de.json';
import ko from './translations/ko.json';

export type Language = 'en-US' | 'en-GB' | 'ta' | 'ar' | 'zh' | 'ja' | 'ml' | 'te' | 'si' | 'de' | 'ko' | 'it' | 'nl' | 'sv' | 'hi';

type TranslationType = typeof enUS;

// Helper to merge partial translations with English fallback
const mergeWithFallback = (partial: Record<string, unknown>): TranslationType => {
  return { ...enUS, ...partial } as TranslationType;
};

export const translations: Record<Language, TranslationType> = {
  'en-US': enUS,
  'en-GB': mergeWithFallback(enGB),
  'ta': mergeWithFallback(ta),
  'ar': mergeWithFallback(ar),
  'zh': mergeWithFallback(zh),
  'ja': mergeWithFallback(ja),
  'ml': enUS,
  'te': enUS,
  'si': enUS,
  'de': mergeWithFallback(de),
  'ko': mergeWithFallback(ko),
  'it': enUS,
  'nl': enUS,
  'sv': enUS,
  'hi': mergeWithFallback(hi),
};

export const languageNames: Record<Language, string> = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'ta': 'தமிழ்',
  'ar': 'العربية',
  'zh': '中文',
  'ja': '日本語',
  'ml': 'മലയാളം',
  'te': 'తెలుగు',
  'si': 'සිංහල',
  'de': 'Deutsch',
  'ko': '한국어',
  'it': 'Italiano',
  'nl': 'Nederlands',
  'sv': 'Svenska',
  'hi': 'हिंदी',
};

export const rtlLanguages: Language[] = ['ar'];

export default translations;
