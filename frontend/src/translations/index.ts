import ApiFactory         from '../api/ApiFactory';
import i18next            from 'i18next';
import {initReactI18next} from 'react-i18next';
import translation_en     from './en_US/translations.json';
import translation_de     from './de_DE/translations.json';

export function configureI18N(): void {
    i18next
        .use(initReactI18next) //
        .init({
            interpolation: {escapeValue: false},  // React already does escaping
            lng: ApiFactory.getLocale(),
            fallbackLng: 'en',
            ns: ['default'],
            defaultNS: 'default',
            resources: {
                en: {default: translation_en},
                de: {default: translation_de},
            },
        });
}
