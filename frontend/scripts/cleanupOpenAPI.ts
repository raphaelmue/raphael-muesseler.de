const fs = require('fs');

const main = async () => {
	try {
		const data = fs
			.readFileSync('../backend/src/extensions/documentation/documentation/1.0.0/full_documentation.json', 'utf8')
			.replace(/datetime/g, 'string');
		const parsed = JSON.parse(data);
		delete parsed['paths']['/connect/(.*)'];
		delete parsed['paths']['/auth/local'];
		delete parsed['paths']['/auth/local/register'];
		delete parsed['paths']['/auth/{provider}/callback'];
		delete parsed['paths']['/auth/forgot-password'];
		delete parsed['paths']['/auth/reset-password'];
		delete parsed['paths']['/auth/email-confirmation'];
		delete parsed['paths']['/auth/send-email-confirmation'];
		delete parsed['paths']['/users-permissions/permissions'];
		delete parsed['paths']['/users-permissions/roles/{id}'];
		delete parsed['paths']['/users-permissions/roles'];
		delete parsed['paths']['/users-permissions/roles/{role}'];
		delete parsed['paths']['/users/count'];
		delete parsed['paths']['/users'];
		delete parsed['paths']['/users/me'];
		delete parsed['paths']['/users/{id}'];
		fs.writeFileSync(
			'../openapi.json',
			JSON.stringify(parsed)
		);
	} catch (err) {
		console.log(err);
	}
};

main();
