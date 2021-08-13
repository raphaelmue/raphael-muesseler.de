module.exports = ({env}) => ({
	email: {
		provider: 'nodemailer',
		providerOptions: {
			host: env('SMTP_HOST', 'smtp.ionos.de'),
			port: env('SMTP_PORT', 465),
			auth: {
				user: env('SMTP_USERNAME'),
				pass: env('SMTP_PASSWORD'),
			},
			tls: {
				rejectUnauthorized: false
			}
		},
		settings: {
			defaultFrom: env('SMTP_USERNAME'),
			defaultReplyTo: env('SMTP_USERNAME'),
			testAddress: 'info@raphael-muesseler.de'
		}
	}
});
