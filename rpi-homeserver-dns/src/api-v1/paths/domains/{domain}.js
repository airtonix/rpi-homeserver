
const debug = require('debug')('rpi-homeserver-dns/api/domains/one');

module.exports = function (configService, dnsService) {

    function GET(request, response, next) {
        debug('GET', request.params.domain);
        dnsService.daemon.persistence
            .get_configuration((err, configuration) => {
                if (err) {
                    debug('GET.config.error', request.params.domain, err);
                    return response
                    .status(500)
                    .json({ err });
                }

                debug('GET.param.domain', request.params.domain);

                const record = configuration.records
                && configuration.records[request.params.domain];

                if (!record) {
                    debug('GET.error.notFound', request.params.domain);
                    return response
                    .status(404)
                    .send();
                }

                debug('GET.record', record);
                return response
                    .status(200)
                    .json(record);
            });
    }
    GET.apiDocs = {
        summary: 'Returns detail of one dns record.',
        operationId: 'getOneDnsRecord',
    };

    function POST(request, response, next) {
        const { body, params, query } = request;
        debug('POST', { body, params, query }, Object.keys(request));

        dnsService.daemon.persistence
            .create_record(params.domain, body, function (err) {

                if (err) {
                    debug('POST.create.error', params.domain, err);
                    return response
                        .status(500)
                        .json({ err: err.message });
                }

                dnsService.daemon.persistence
                    .get_configuration((err, configuration) => {
                        debug('POST.created', configuration.records[params.domain]);
                        return response
                            .status(201)
                            .send();
                    });
            });
    }

    POST.apiDocs = {
        summary: 'Creates a dns record.',
        operationId: 'createOneDnsRecord',
    };
    function PUT (request, response, next) {
        debug('PUT', request.params.domain);

        dnsService.daemon.persistence
            .update_record(request.params.domain, request.body, function (err) {
                if (err) {
                    debug('PUT.error', request.params.domain, err);

                    return response
                        .status(500)
                        .json({ err });
                }

                debug('PUT.updated');

                return response
                    .status(204)
                    .json();
            });
    }

    function DELETE (request, response, next) {
        debug('DELETE', request.params.domain);

        dnsService.daemon.persistence
            .delete_record(request.params.domain, function (err) {

                if (err) {
                    debug('DELETE.error', request.params.domain, err);

                    return response
                        .status(500)
                        .json({ err });
                }

                debug('DELETE.removed', request.params.domain);

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