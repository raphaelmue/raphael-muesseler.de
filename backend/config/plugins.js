module.exports = ({env}) => ({
	email: {
		provider: 'nodemailer',
		providerOptions: {
			host: env('SMTP_HOST', 'smtp.ionos.de'),
			port: env('SMTP_PORT', 465),
			secure: true,
			auth: {
				user: env('SMTP_USERNAME'),
				pass: env('SMTP_PASSWORD'),
			}
		},
		settings: {
			defaultFrom: env('SMTP_USERNAME'),
			defaultReplyTo: env('SMTP_USERNAME'),
			testAddress: 'info@raphael-muesseler.de'
		}
	},
	documentation: {
		enabled: true,
		config: {
			openapi: "3.0.3",
			info: {
				version: "1.0.0",
				title: "Raphael Müßeler API",
				description: "API",
				contact: {
					name: "Raphael Müßeler",
					email: "info@raphael-muesseler.de",
					url: "raphael-muesseler.de"
				}
			},
			"x-strapi-config": {
				path: "/documentation",
				showGeneratedFiles: true,
				generateDefaultResponse: false,
				plugins: ["i18n"],
				mutateDocumentation: (generatedDocumentationDraft) => {
					generatedDocumentationDraft.paths["/i18n/locales"].get.responses["200"].content["application/json"].schema = {
						type: "array",
						items: {
							$ref: "#/components/schemas/I18NLocale"
						}
					}
				}
			},
			servers: [
				{
					url: "http://localhost:1337/api",
					description: "Development server"
				},
				{
					url: "https://api.raphael-muesseler.de",
					description: "Production server"
				}
			]
		}

	}
});
