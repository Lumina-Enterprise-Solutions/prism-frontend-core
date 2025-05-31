import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationID from '../locales/id/translation.json';
import translationEN from '../locales/en/translation.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en', // atau 'id' jika kamu mau test pakai bahasa Indonesia
        debug: false,
        resources: {
            id: { translation: translationID },
            en: { translation: translationEN }
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;