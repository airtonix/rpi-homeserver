const dhcp = require('dhcp');
const debug = require('debug')('rpi-homeserver-dhcp/dhcpService');
const configService = require('./configService');

module.exports = class Service {

    constructor () {
        this.reload();
        debug('constructed');
    }

    get options () {
        return configService.get('dhcpd');
    }

    set options (value) {
        configService.set('dhcpd', value);
        configService.save();
    }

    create () {
        debug('create', this.options);

        const Server = dhcp.createServer(this.options);

        Server.on('listening', this.onListen.bind(this));
        Server.on('message', this.onMessage.bind(this));
        Server.on('bound', this.onBound.bind(this));
        Server.on('close', this.onClose.bind(this));
        Server.on('error', this.onError.bind(this));

        debug('created');
        return Server;
    }

    reload () {
        if (this.server) {
            debug('reloading');
            this.server.close();
        }
        this.server = this.create();
        this.server.listen();
    }

    onListen () {
        debug('listening')
    }
    onMessage (message) {
        debug('onMessage', {message});
    }
    onBound (state) {
        debug('onBound', { state });
    }
    onClose () {
        debug('onClose');
    }
    onError (err) {
        debug('onError', {err});
    }

}