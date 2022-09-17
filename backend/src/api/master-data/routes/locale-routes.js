
module.exports = {
	routes: [
		{
			method: "GET",
			path: "/locales",
			handler: "master-data.getLocales",
			config: {
				policies: []
			}
		}
	]
}
