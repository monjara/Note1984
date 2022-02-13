import I18n from 'i18n-js';
import * as Localize from 'react-native-localize';

import en from './en';
import ja from './ja';

const locales = Localize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  ja,
};

export default I18n;
