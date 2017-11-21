module.exports = {
    swagger: '2.0',
    basePath: '/v1',
    info: {
        title: 'Dns Configuration Api.',
        version: '1.0.0'
    },
    definitions: {
        DnsRecord: {
            type: 'object',
            properties: {

                address: {
                    description: 'IP addresse(s).',
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },

                type: {
                    description: "DNS Resource type",
                    type: "string"
                },

                ttl: {
                    description: "Time to live.",
                    type: "string"
                }
            }
        },
        Forwarder: {
            description: "Upstream DNS server to use when we can't answer a question",
            properties: {

                timeout: {
                    description: "When to stop and move onto next forwarder",
                    type: 'number'
                },
                port: {
                    description: "Port to use when querying this upstream",
                    type: 'number'
                }
            }
        }
    },
    paths: {}
};
