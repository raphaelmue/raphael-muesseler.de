'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	listLocales: async (ctx) => {
		const model = strapi.query('locale', 'i18n');
		const locales = await model.find();

		const defaultLocale = await strapi.store({
			environment: '',
			type: 'plugin',
			name: 'i18n',
		}).get({key: 'default_locale'})

		ctx.send(locales.map(locale => {
			delete locale.created_by;
			delete locale.updated_by;
			return {...locale, isDefault: locale.code === defaultLocale}
		}));
	}
};
