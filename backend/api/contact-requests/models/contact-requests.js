'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const messageTemplate = require('../../../extensions/email/templates/message-template.js');

function replaceVariablesInContent(content, data) {
	let replacedContent = content;
	const matches = content.matchAll(/(<%=.*?%>)/g);
	for (const match of matches) {
		const key = match[0].replace('<%= data.', '').replace(' %>', '');
		const value = key.split('.').reduce(function (a, b) {
			return a[b];
		}, data);
		replacedContent = content.replace(match[0], value);
	}
	return replacedContent;
}

module.exports = {
	lifecycles: {
		/**
		 * Send Email after create a new contact request
		 * @param result
		 * @param requestData
		 * @returns {Promise<void>}
		 */
		afterCreate: async (result, requestData) => {
			const templateInfo = await strapi.query('email-templates', '').findOne({templateName: 'confirmationMessage'});
			const headerInfo = await strapi.query('header', '').findOne();

			templateInfo.subtitle = replaceVariablesInContent(templateInfo.subtitle, {
				header: headerInfo,
				request: requestData
			});
			templateInfo.message = replaceVariablesInContent(templateInfo.message, {
				header: headerInfo,
				request: requestData
			})

			let templateData = {
				...templateInfo,
				header: headerInfo,
				request: requestData
			};

			strapi.plugins['email'].services.email.sendTemplatedEmail({
					to: result.email,
					attachments: [{
						filename: `${templateData.icon}.png`,
						path: __dirname + `/../../../extensions/email/templates/images/${templateData.icon}.png`
					}, {
						filename: 'signature.jpg',
						path: __dirname + '/../../../extensions/email/templates/images/signature.jpg'
					}, {
						filename: 'globe-solid.png',
						path: __dirname + '/../../../extensions/email/templates/images/globe-solid.png'
					}, {
						filename: 'instagram-brands.png',
						path: __dirname + '/../../../extensions/email/templates/images/instagram-brands.png'
					}, {
						filename: 'github-brands.png',
						path: __dirname + '/../../../extensions/email/templates/images/github-brands.png'
					}]
				}, {
					...messageTemplate,
					subject: templateInfo.subject
				}, {
					data: templateData
				}
			);
		}
	}
};
