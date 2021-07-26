module.exports = ({env}) => ({
	host: env('HOST', 'localhost'),
	port: env.int('PORT', 3001),
	admin: {
		auth: {
			secret: env('ADMIN_JWT_SECRET', '3b46eb7476d5a052870c13db678c078f'),
		},
	},
});
