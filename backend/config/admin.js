module.exports  = ({env}) => ({
	url: "/admin",
	auth: {
		secret: env('ADMIN_JWT_SECRET')
	}
});
