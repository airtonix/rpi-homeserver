const debug = require('debug')('rpi-homeserver-dns/api/domains');

module.exports = function (configService, dnsService) {

    function GET (request, response, next) {
        debug('GET')
        dnsService.daemon.persistence.get_configuration((err, configuration) => {
            if (err) {
                debug('GET.err')
                return response
                    .status(500)
                    .json({err});
            }

            debug('GET.success', configuration.records);

            response
                .status(200)
                .json(configuration.records);
        });
    }

    return {
       GET
    }
}