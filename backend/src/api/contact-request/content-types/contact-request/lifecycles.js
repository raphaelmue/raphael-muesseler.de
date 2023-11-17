const messageTemplate = require('../../../../extensions/email/templates/message-template.js');
const env = require("cross-env");


module.exports = {
	async afterCreate(event) {
		const {result, params} = event;

		const templateInfo = await strapi.db.query('api::email-template.email-template').findOne({
			where: {templateName: 'confirmationMessage'},
			populate: ['deep']
		});
		const masterData = await strapi.db.query('api::master-data.master-data').findOne({
			where: {id: '1'},
			populate: ['deep']
		});

		templateInfo.subtitle = replaceVariablesInContent(templateInfo.subtitle, {
			masterData: masterData,
			request: params
		});
		templateInfo.message = replaceVariablesInContent(templateInfo.message, {
			masterData: masterData,
			request: params
		})

		let templateData = {
			...templateInfo,
			masterData: masterData,
			request: params
		};


		try {

			strapi.plugins['email'].services.email.sendTemplatedEmail({
					from: process.env.SMTP_USERNAME,
					replyTo: process.env.SMTP_USERNAME,
					bcc:  process.env.SMTP_USERNAME,
					to: result.email,
					attachments: [{
						filename: `${templateData.icon}.png`,
						path: __dirname + `/../../../../extensions/email/templates/images/${templateData.icon}.png`
					}, {
						filename: 'signature.jpg',
						path: __dirname + '/../../../../extensions/email/templates/images/signature.jpg'
					}, {
						filename: 'globe-solid.png',
						path: __dirname + '/../../../../extensions/email/templates/images/globe-solid.png'
					}, {
						filename: 'instagram-brands.png',
						path: __dirname + '/../../../../extensions/email/templates/images/instagram-brands.png'
					}, {
						filename: 'github-brands.png',
						path: __dirname + '/../../../../extensions/email/templates/images/github-brands.png'
					}]
				}, {
					html: messageTemplate,
					text: templateInfo.subject,
					subject: templateInfo.subject
				}, {data: templateData}
			);
		} catch (e) {
			console.error(e);
		}

	}
};

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
