import  {loadResourceAsHtml,} from '../libs/resourcesHandler';
import  {SPOTS,} from '../libs/constants';
import  {PLAYERS,} from '../libs/mockedPlayers';
import  {assignSpots,} from '../libs/playerSpotHandler';

/**
 * Main function to load the library and setup things properly
 */
(function() {
    
    var assignBtn = document.querySelector('#assignBtn');

    assignBtn.addEventListener('click', function(event) {
        var container = document.querySelector('.container');

        var elementsOnContainer = document.getElementsByClassName('playerName');
        while(elementsOnContainer[0]) {
            elementsOnContainer[0].parentNode.removeChild(elementsOnContainer[0]);
        }

        var mapPlayerNamesProps = [
            {
                name: 'class',
                value: 'playerName',
            },
        ];
    
        const assignedSpots = assignSpots(SPOTS, PLAYERS);
    
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
                playerNameDiv.style.top = (spotHeightDistance + divHeight * j + 12) + 'px';
                
                j += 1;
            }
        }

    });

})();