import { lchmod } from 'fs';

// ./api-v1/paths/worlds.js
const debug = require('debug')('rpi-homeserver-dhcp/api/config');


module.exports = function (dhcpService, configService) {
    let operations = {
        GET,
        POST,
    };

    function GET(req, res, next) {
        debug('get')
        res.status(200)
            .json(configService.get());
    }

    GET.apiDoc = {
        summary: 'Returns configuration.',
        operationId: 'getDhcpConfig',
        responses: {
            200: { $ref: "#/responses/ConfigurationObjectFound"},
            default: { $ref: "#/responses/ServerError" }
        }
    };

    function POST(req, res, next) {
        const {body, params, query} = req;
        debug('post', { body, params, query }, Object.keys(req));
        const validationError = res.validateResponse(200);

        if (validationError) {
            return next(validationError);
        }

        debug('post.valid');

        Promise.resolve()
            .then(() => {
                configService.set('dhcpd', body);
                configService.save();
                return;
            })
            .then(() => dhcpService.reload())
            .then(() => res.status(201).json(configService.get()))
            .catch(err => {
                debug('post.err', err);
                return next(err);
            });
    }

    POST.apiDoc = {
        summary: 'Saves configuration.',
        operationId: 'setDhcpConfiguration',
        responses: {
            201: { $ref: "#/responses/ConfigurationObjectSaved" },
            default: { $ref: "#/responses/ServerError" }
        }
    };

    return operations;
}