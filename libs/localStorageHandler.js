export function getRegisteredPlayers() {
    return JSON.parse(localStorage.getItem('registeredPlayers'));
}

export function updateRegisteredPlayers(registeredPlayers) {
    registeredPlayers = registeredPlayers.map(
        (player) => {
            let updatedPlayer = player;
            updatedPlayer.privilege = false;
            return updatedPlayer;
        }
    );

    localStorage.setItem('registeredPlayers', JSON.stringify(registeredPlayers));
}

export function clearLocalStorage() {
    localStorage.clear();
}