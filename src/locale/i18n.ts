import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
const getLocaleResource = (
  requireContext: __WebpackModuleApi.RequireContext
) => {
  return requireContext.keys().map(requireContext);
};
require.context('../locale/', true, /(.*)src(.*).(json)$/);

const localeResource = getLocaleResource(
  require.context('../locale/', true, /\.(json)$/)
);

const resources: any = {
  en: {},
  ko: {},
  chi: {},
};

const mergeLocaleResource = () => {
  const targetRes: any = [...localeResource];
  targetRes.forEach(
    (res: { namespace: string; locale: { [x: string]: any } }) => {
      const namespace = res.namespace;
      for (const key in res.locale) {
        const newLocale = res.locale[key];
        if (key in resources) {
          resources[key] = {
            translation: {
              ...resources[key]?.translation,
              ...{
                [namespace]: { ...newLocale.translation },
              },
            },
          };
        }
      }
    }
  );
};
mergeLocaleResource();

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
