const {join} = require('path');
const debug = require('debug')('rpi-homeserver-dns/dnsService');
const configService = require('./configService');

const Quarry = require("quarry-dns");

module.exports = class Service {

  constructor() {
    debug('constructing');
    this.options = configService.get('dns')
    this.daemon = new Quarry(this.options);
    this.listen();
  }

  listen () {
    this.daemon.listen(() => {
      console.log("quarry is now listening");
    });
  }

};
