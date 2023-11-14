const fs = require('fs');

let data = fs.readFileSync(__dirname + '/message-template.html', {encoding: 'utf8'});

module.exports = {
	text: `
        ${data.title} \n\r
		${data.subtitle} \n\r
		${data.message}`,
	html: `{data}`
}
