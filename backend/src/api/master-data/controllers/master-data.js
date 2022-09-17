'use strict';

/**
 *  master-data controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::master-data.master-data', ({strapi}) => ({
	async getLocales(ctx) {
		const model = strapi.query('plugin::i18n.locale');
		const locales = await model.findMany();

		const defaultLocale = await strapi.store({
			environment: '',
			type: 'plugin',
			name: 'i18n',
		}).get({key: 'default_locale'})

		ctx.send(locales.map(locale => {
			return {...locale, isDefault: locale.code === defaultLocale}
		}));
	}
}));
