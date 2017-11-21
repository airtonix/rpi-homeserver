module.exports = function (configService, dnsService) {

    function GET(request, response, next) {
        dnsService.daemon.persistence
            .get_configuration((err, configuration) => {
                if (err) {
                    return response
                        .status(500)
                        .json({ err });
                }
                const record = configuration.records
                    && configuration.forwarders[request.params.forwarder];

                if (!record) {
                    return response
                        .status(404)
                        .send();
                }

                return response
                    .status(200)
                    .json(record);
            });
    }

    function POST(request, response, next) {

        dnsService.daemon.persistence
            .create_forwarder(request.params.forwarder, request.body, function (err) {
                if (err) {
                    return response
                        .status(500)
                        .json({ err });
                }

                return response
                    .status(201)
                    .send();
            });
    }

    function PUT(request, response, next) {

        dnsService.daemon.persistence
            .update_forwarder(request.params.forwarder, request.body, function (err) {
                if (err) {
                    return response
                        .status(500)
                        .json({ err });
                }

                return response
                    .status(204)
                    .json();
            });
    }

    function DELETE(request, response, next) {

        dnsService.daemon.persistence
            .delete_forwarder(request.params.forwarder, function (err) {
                if (err) {
                    return response
                        .status(500)
                        .json({ err });
                }

                return response
                    .status(204)
                    .send();
            });
    }

    return {
        GET,
        POST,
        PUT,
        DELETE,
    }
}