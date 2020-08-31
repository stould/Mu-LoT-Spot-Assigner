import  {loadResourceAsHtml,} from '../libs/resourcesHandler';
import  {REGULAR_SPOTS, HS_SPOTS}  from '../libs/constants';
import  {assignSpots,} from '../libs/playerSpotHandler';
import  {getRandomIntBetween,} from '../libs/helper';

function placePlayersOnMap(playerLabelHeightDistance, players, spotType) {
    var mapPlayerNamesProps = [
        {
            name: 'class',
            value: 'playerNameLabel',
        },
    ];
    var container = document.querySelector('.mapContainer');

    const assignedSpots = spotType == 'regular' ? 
        assignSpots(REGULAR_SPOTS, players, 'regular') : assignSpots(HS_SPOTS, players, 'hs');
    
    for(var i = 0; i < assignedSpots.length; i++) {

        const spot = assignedSpots[i].spot;

        var spotWidthDistance = spot.width;
        var spotHeightDistance = spot.height;
        var j = 1;

        while(j <= assignedSpots[i].players.length) {

            var playerNameDiv = loadResourceAsHtml('div', mapPlayerNamesProps);
            container.appendChild(playerNameDiv);
            playerNameDiv.innerHTML = assignedSpots[i].players[j - 1].name;

            const divHeight = playerNameDiv.offsetHeight - 2;
            const divWidth = playerNameDiv.offsetWidth;

            playerNameDiv.style.left = (spotWidthDistance - divWidth / 2) + 'px';
            playerNameDiv.style.top = (spotHeightDistance + divHeight * j + playerLabelHeightDistance) + 'px';

            j += 1;
        }
    }
}

export function setupMapHandler(playerHandler, formHandler) {
    var assignMapRegularBtn = document.querySelector('#assignMapRegularBtn');
    var assignMapHsBtn = document.querySelector('#assignMapHsBtn');
    assignMapRegularBtn.disabled = true;

    assignMapRegularBtn.addEventListener('click', function() {
        formHandler.clearCurrentPlayersFromMap(
            playerHandler.getRegisteredPlayers().filter((player) => player.privilege == true)
        );
        placePlayersOnMap(
            12, playerHandler.getRegisteredPlayers().filter((player) => player.privilege == false), 'regular'
        );
    });

    assignMapHsBtn.addEventListener('click', function() {
        formHandler.clearCurrentPlayersFromMap(null);
        let players = playerHandler.getRegisteredPlayers();
        let allPlayers = playerHandler.getRegisteredPlayers();

        if(allPlayers.length > 1) {
            let player1 = getRandomIntBetween(0, players.length);
            playerHandler.updatePlayerPrivilegeTemporarly(allPlayers[player1], true);
            
            let player2 = getRandomIntBetween(0, players.length);
            while(player1 == player2) {
                player2 = getRandomIntBetween(0, players.length);
            }

            playerHandler.updatePlayerPrivilegeTemporarly(allPlayers[player2], true);
        } else if(allPlayers.length == 1) {
            playerHandler.updatePlayerPrivilegeTemporarly(allPlayers[0], true);
        }

        placePlayersOnMap(
            12, playerHandler.getRegisteredPlayers().filter((player) => player.privilege == true), 'hs'
        );

        
        assignMapHsBtn.disabled = true;
        assignMapRegularBtn.disabled = false;
    });
}