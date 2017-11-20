const nconf = require('nconf');
const {join} = require('path');
const debug = require('debug')('rpi-homeserver-dhcp/configService');

debug('loading')
module.exports = nconf
    .argv()
    .env({lowerCase: true})
    .file('dhcpd', join(process.cwd(), 'config.json'))