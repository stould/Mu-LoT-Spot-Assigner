import  {loadResourceAsHtml,} from '../libs/resourcesHandler';
import  {SPOTS,} from '../libs/constants';
import  {assignSpots,} from '../libs/playerSpotHandler';



export function placePlayersOnMap(playerLabelHeightDistance, players = null) {
    var mapPlayerNamesProps = [
        {
            name: 'class',
            value: 'playerName',
        },
    ];
    var container = document.querySelector('.container');

    const assignedSpots = assignSpots(SPOTS, players);
    
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
    var assignBtn = document.querySelector('#assignBtn');
    assignBtn.addEventListener('click', function() {
        formHandler.cleanCurrentPlayerSpots();
        placePlayersOnMap(12, playerHandler.getRegisteredPlayers());
    });
}