
module.exports = {
	routes: [
		{
			method: "GET",
			path: "/master-data/locales",
			handler: "api::master-data.master-data.getLocales",
			config: {
				policies: []
			}
		}
	]
}
