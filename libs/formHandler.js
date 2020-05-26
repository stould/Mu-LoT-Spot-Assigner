import  {loadResourceAsHtml,} from '../libs/resourcesHandler';

function loadInitialRegisteredPlayers(playerHandler, localStorageHandler) {
    playerHandler.getRegisteredPlayers().forEach((player) => {
        var playerLabelButton = addPlayerToPreview(player);
        addDeleteEventOnPlayerLabelButton(playerLabelButton, playerHandler, localStorageHandler);
    });
}

function addDeleteEventOnPlayerLabelButton(playerLabelButton, playerHandler, localStorageHandler) {
    const playerName = playerLabelButton.innerHTML;
    playerLabelButton.addEventListener('click', function() {
        var confirmBox = confirm('Do you really wish to delete the player ' + playerName +' from registered players?');
        if(confirmBox) {
            var elementsOnPreview = document.getElementsByClassName('buttonPlayerPreviewSpan');
            for(var i = 0; i < elementsOnPreview.length; i++) {
                if(elementsOnPreview[i].innerHTML === playerName) {
                    var currentNode = elementsOnPreview[i].parentNode;
                    currentNode.parentNode.removeChild(currentNode);
                    break;
                }
            }

            playerHandler.removePlayerByName(playerName);
            localStorageHandler.updateRegisteredPlayers(playerHandler.getRegisteredPlayers());
            clearCurrentPlayersFromMap();
        }
    });
}

function addPlayerToPreview(player) {
    var previewPlayersDiv = document.querySelector('#previewPlayers');
    var previewPlayerProps = [
        {
            name: 'class',
            value: 'buttonPlayerPreview',
        },
    ];

    var playerLabelButton = loadResourceAsHtml('button', previewPlayerProps);

    var playerLabelSpan = loadResourceAsHtml('span', [{
        name: 'class',
        value: 'buttonPlayerPreviewSpan',
    },]);

    playerLabelSpan.innerHTML = player.name;

    playerLabelButton.appendChild(playerLabelSpan);
    previewPlayersDiv.appendChild(playerLabelButton);
    return playerLabelSpan;
}

function setupRegisterPlayer(playerHandler, localStorageHandler) {
    var regPlayerBtn = document.querySelector('#regPlayerBtn');
    regPlayerBtn.addEventListener('click', function() {

        var playerName = document.querySelector('#playerName').value;
        var playerLevel = document.querySelector('#playerLevel').selectedIndex;

        if(!playerName.trim()) {
            alert('Please fill out player name.');
        } else {
            var player = {
                name: playerName,
                level: playerLevel,
            };

            var playerLabelButton = addPlayerToPreview(player);
            addDeleteEventOnPlayerLabelButton(playerLabelButton, playerHandler, localStorageHandler);

            playerHandler.registerPlayer(
                player, 
                localStorageHandler,
            );
        }
    });
}

function setupClearPlayers(playerHandler, localStorageHandler) {
    var clearPlayers = document.querySelector('#clearPlayers');
    clearPlayers.addEventListener('click', function() {
        var confirmBox = confirm('Do you really wish to clear the registered players?');
        if(confirmBox) {
            clearCurrentPlayersFromMap();
            clearCurrentPlayersFromPreview();
            playerHandler.clearRegisteredPlayers();
            localStorageHandler.clearLocalStorage();
        }
    });
}

function clearCurrentPlayersFromPreview() {
    var elementsOnPreview = document.getElementsByClassName('buttonPlayerPreview');
    while(elementsOnPreview[0]) {
        elementsOnPreview[0].parentNode.removeChild(elementsOnPreview[0]);
    }
}

export function setupFormHandler(playerHandler, localStorageHandler) {
    loadInitialRegisteredPlayers(playerHandler, localStorageHandler);
    setupRegisterPlayer(playerHandler, localStorageHandler);
    setupClearPlayers(playerHandler, localStorageHandler);
}

export function clearCurrentPlayersFromMap() {
    var elementsOnContainer = document.getElementsByClassName('playerNameLabel');
    while(elementsOnContainer[0]) {
        elementsOnContainer[0].parentNode.removeChild(elementsOnContainer[0]);
    }
}