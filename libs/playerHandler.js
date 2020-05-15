var registeredPlayers;

export function setupPlayerHandler() {
    registeredPlayers = [];
}

export function registerPlayer(player) {
    registeredPlayers.push(player);
}

export function getRegisteredPlayers() {
    return registeredPlayers;
}