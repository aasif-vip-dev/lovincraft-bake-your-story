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

export const translations: Record<Language, typeof enUS> = {
  'en-US': enUS,
  'en-GB': enGB,
  'ta': ta,
  'ar': ar,
  'zh': zh,
  'ja': ja,
  'ml': ta, // Fallback to Tamil for now
  'te': ta, // Fallback to Tamil for now  
  'si': ta, // Fallback to Tamil for now
  'de': de,
  'ko': ko,
  'it': de, // Fallback to German for now
  'nl': de, // Fallback to German for now
  'sv': de, // Fallback to German for now
  'hi': hi,
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
