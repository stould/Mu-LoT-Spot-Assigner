export function getRegisteredPlayers() {
    return JSON.parse(localStorage.getItem('registeredPlayers'));
}

export function updateRegisteredPlayers(registeredPlayers) {
    localStorage.setItem('registeredPlayers', JSON.stringify(registeredPlayers));
}

export function clearLocalStorage() {
    localStorage.clear();
}