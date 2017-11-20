module.exports = {
    swagger: '2.0',
    basePath: '/v1',
    'x-express-openapi-case-sensitive': false,
    info: {
        title: 'rPI Homeserver DHCP API.',
        version: '1.0.0'
    },
    definitions: {
        DhcpConfiguration: {
            type: 'object',
            properties: {
                range: {
                    description: 'range of ip address that are offered.',
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                router: {
                    description: 'Default gateways',
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                netmask: {
                    description: 'Network mask',
                    type: 'string'
                },
                static: {
                    description: "IP address reservation based on MAC address",
                    type: 'object'
                },
                nameServer: {
                    description: 'list of dns servers that clients will use',
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
            },
            required: ['range', 'router', 'nameServer']
        },
    },
    responses: {
        ConfigurationObjectFound: {
            description: 'The DHCPd configuration.',
            schema: {
                $ref: '#/definitions/DhcpConfiguration'
            }
        },
        ConfigurationObjectSaved: {
            description: 'Saved configuration.',
            schema: {
                $ref: '#/definitions/DhcpConfiguration'
            }
        },
        ServerError: {
            description: 'An error occurred',
        }
    },
    paths: {}
};
