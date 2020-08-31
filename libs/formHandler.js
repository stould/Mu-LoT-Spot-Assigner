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

function registerPlayer(playerHandler, localStorageHandler) {
    var playerName = document.querySelector('#playerName').value.trim();
    var playerLevel = document.querySelector('#playerLevel').selectedIndex;

    if(!playerName) {
        alert('Please fill out player name.');
    } else if(playerHandler.playerExists(playerName)) {
        alert('There is already a player with the same name.');
    } else {
        var player = {
            name: playerName,
            level: playerLevel,
            privilege: false,
        };

        var playerLabelButton = addPlayerToPreview(player);
        addDeleteEventOnPlayerLabelButton(playerLabelButton, playerHandler, localStorageHandler);
        playerHandler.registerPlayer(player, localStorageHandler);
    }
}

function setupRegisterPlayer(playerHandler, localStorageHandler) {
    var regPlayerBtn = document.querySelector('#regPlayerBtn');    
    var playerNameInputBox = document.querySelector('#playerName');

    regPlayerBtn.addEventListener('click', function() {
        registerPlayer(playerHandler, localStorageHandler);
        playerNameInputBox.value = '';
        playerNameInputBox.focus();
    });

    playerNameInputBox.addEventListener('keypress', function(e) {
        if(e.key == 'Enter') {
            registerPlayer(playerHandler, localStorageHandler);
            playerNameInputBox.value = '';
            playerNameInputBox.focus();
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

export function clearCurrentPlayersFromMap(exceptions) {
    var elementsOnContainer = document.getElementsByClassName('playerNameLabel');
    if(exceptions == null) {
        while(elementsOnContainer[0]) {
            elementsOnContainer[0].parentNode.removeChild(elementsOnContainer[0]);
        }
    } else {
        var filteredNames = exceptions.map((player) => player.name);
        let exceptionCount = 0;
        while(elementsOnContainer[exceptionCount]) {
            const value = elementsOnContainer[exceptionCount].innerHTML;
            if(filteredNames.includes(value)) {
                exceptionCount++;
                continue;
            }
            elementsOnContainer[exceptionCount].parentNode.removeChild(elementsOnContainer[exceptionCount]);
        }
    }
}