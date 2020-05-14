import  {
    cleanCurrentPlayerSpots,
    placePlayersOnMap,
} from '../libs/mapHandler';

/**
 * Main function to load the library and setup things properly
 */
(function() {
    
    var assignBtn = document.querySelector('#assignBtn');
    var previewPlayersDiv = document.querySelector('#previePlayers');
    var registeredPlayers = [];

    assignBtn.addEventListener('click', function(event) {
        cleanCurrentPlayerSpots();
        placePlayersOnMap(12, registeredPlayers);
    });

    var regPlayerBtn = document.querySelector('#regPlayerBtn');
    regPlayerBtn.addEventListener('click', function(event) {
        var playerName = document.querySelector('#playerName').value;
        var playerLevel = parseInt(document.querySelector('#playerLevel').value);
        previewPlayersDiv.innerHTML += playerName + ', ';
        registeredPlayers.push({
            name: playerName,
            level: playerLevel,
        });
    });

})();