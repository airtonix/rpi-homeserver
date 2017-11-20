// ./app.js
const nconf = require('nconf');
const express = require('express');
const openapi = require('express-openapi');
const v1WorldsService = require('./api-v1/services/worldsService');
const v1ApiDoc = require('./api-v1/api-doc');
const {join} = require('path');


console.log('collection argv')
const Config = nconf.argv().env().defaults({
    port: 3000,
}).get();

console.log('starting express')
const app = express();

console.log('starting openapi')
openapi.initialize({
    app,
    apiDoc: v1ApiDoc,
    dependencies: {
        worldsService: v1WorldsService
    },
    paths: join(__dirname, 'api-v1', 'paths')
});

app.listen(Config.port);

module.exports = {
    Config,
    app
};
