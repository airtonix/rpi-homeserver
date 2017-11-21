module.exports = function (configService, dnsService) {

    function GET(request, response, next) {
        dnsService.daemon.persistence.get_configuration((err, configuration) => {
            if (err) {
                response.status(500).json({ err });
                return;
            }

            response
                .status(200)
                .json(configuration.forwarders);
        });
    }

    return {
        GET
    }
}