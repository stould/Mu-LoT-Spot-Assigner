var registeredPlayers;

export function setupPlayerHandler(localStorageHandler) {
    registeredPlayers = localStorageHandler.getRegisteredPlayers() || [];
}

export function registerPlayer(player, localStorageHandler) {
    registeredPlayers.push(player);
    localStorageHandler.updateRegisteredPlayers(registeredPlayers);
}

export function updatePlayerPrivilegeTemporarly(targetPlayer, newPrivilege) {
    for(let i = 0; i < registeredPlayers.length; i++) {
        if(targetPlayer.name == registeredPlayers[i].name) {
            targetPlayer.privilege = newPrivilege;
            break;
        }
    }
}

export function removePlayerByName(playerName) {
    registeredPlayers = registeredPlayers.filter((player) => {
        return playerName !== player.name;
    });
}

export function clearRegisteredPlayers() {
    while(registeredPlayers.length > 0) {
        registeredPlayers.pop();
    }
}

export function playerExists(playerName) {
    const filter = registeredPlayers.filter((player) => {
        return playerName == player.name;
    });
    return filter.length > 0;
}

export function getRegisteredPlayers() {
    return registeredPlayers;
}