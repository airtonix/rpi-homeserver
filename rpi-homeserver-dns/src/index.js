// ./app.js
const nconf = require('nconf');
const express = require('express');
const bodyParser = require('body-parser');
const openapi = require('express-openapi');
const {join} = require('path');

const v1ApiDoc = require('./api-v1/api-doc');
const v1DnsService = require('./api-v1/services/dnsService');
const v1ConfigService = require('./api-v1/services/configService');


console.log('starting express')
const app = express();
app.use(bodyParser.json());

console.log('starting openapi')
openapi.initialize({
    app,
    apiDoc: v1ApiDoc,
    consumesMiddleware: {
        'application/json': bodyParser.json(),
    },
    dependencies: {
        configService: v1ConfigService,
        dnsService: new v1DnsService()
    },
    paths: join(__dirname, 'api-v1', 'paths')
});

app.listen(v1ConfigService.get("port"), () => {
    console.log(`Listening on ${v1ConfigService.get("port")}`);
});
