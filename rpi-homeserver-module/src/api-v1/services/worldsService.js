// ./api-v1/services/worldsService.js

let worlds = {
    Earth: {
        name: 'Earth'
    }
};

module.exports = {
    getWorlds(name) {
        return worlds[name] ? [worlds[name]] : [];
    }
};
