import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './locale/en.json';
import fr from './locale/fr.json';
const i18n = new I18n({
  en,
  fr,
});
const fallback = { languageTag: 'en', isRTL: false };

const { languageTag, isRTL } =
  RNLocalize.findBestAvailableLanguage(['en', 'fr']) || fallback;

i18n.locale = languageTag;

export default function $t(key: string, params = {}) {
  return i18n.t(key, params);
}
