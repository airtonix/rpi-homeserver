// ./app.js
const nconf = require('nconf');
const express = require('express');
const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const {join} = require('path');
const debug = require('debug')('rpi-homeserver-dhcp');

const dhcpService = require('./api-v1/services/dhcpService');
const configService = require('./api-v1/services/configService');
const apiDoc = require('./api-v1/api-doc');

const app = express();
app.use(bodyParser.json())
debug('config', configService.get());

debug('starting openapi')
openapi.initialize({
    app,
    apiDoc,
    consumesMiddleware: {
        'application/json': bodyParser.json(),
    },
    dependencies: {
        configService,
        dhcpService: new dhcpService()
    },
    paths: join(__dirname, 'api-v1', 'paths')
});

app.listen(configService.get('port'), (app) => {
    debug('server.listening', configService.get('port'));
});

