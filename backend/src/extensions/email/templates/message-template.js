const fs = require('fs')
const path = require('path')

const data = fs.readFileSync(path.resolve(__dirname, 'message-template.html'), 'utf8');

module.exports = data;
