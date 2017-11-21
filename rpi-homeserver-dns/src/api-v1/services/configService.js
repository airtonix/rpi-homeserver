const nconf = require('nconf');
const {join} = require('path');
const debug = require('debug')('rpi-homeserver-dns/configService');


debug('loading')
module.exports = nconf
    .argv()
    .env({lowerCase: true})
    .file('dns', join(process.cwd(), 'config.json'))