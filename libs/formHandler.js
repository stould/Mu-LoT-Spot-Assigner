export function setupFormHandler(playerHandler) {
    var previewPlayersDiv = document.querySelector('#previePlayers');
    var regPlayerBtn = document.querySelector('#regPlayerBtn');

    regPlayerBtn.addEventListener('click', function() {

        var playerName = document.querySelector('#playerName').value;
        var playerLevel = parseInt(document.querySelector('#playerLevel').value);
        previewPlayersDiv.innerHTML += playerName + ', ';

        playerHandler.registerPlayer({
            name: playerName,
            level: playerLevel,
        });
    });
}

export function cleanCurrentPlayerSpots() {
    var elementsOnContainer = document.getElementsByClassName('playerName');
    while(elementsOnContainer[0]) {
        elementsOnContainer[0].parentNode.removeChild(elementsOnContainer[0]);
    }
}