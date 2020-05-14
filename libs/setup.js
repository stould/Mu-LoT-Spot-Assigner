import  {loadResourceAsHtml,} from '../libs/resourcesHandler';
import  {SPOTS,} from '../libs/constants';

/**
 * Main function to load the library and setup things properly
 */
(function() {
    var container = document.querySelector('#main');
    const fileName = 'images/map.png';

    var mapContainer = document.querySelector('#map');

    for(var i = 0; i < SPOTS.length; i++) {        
        var mapPlayerNamesProps = [
            {
                name: 'class',
                value: 'test',
            },
        ];
        var spotWidthDistance = SPOTS[i].width;
        var spotHeightDistance = SPOTS[i].height;
        var spotNumber = SPOTS[i].number;

        var playerNameDiv = loadResourceAsHtml('div', mapPlayerNamesProps);
        playerNameDiv.style.left = (spotWidthDistance + 10) + 'px';
        playerNameDiv.style.top = (spotHeightDistance + 10) + 'px';
        playerNameDiv.innerHTML = spotNumber;

        container.appendChild(playerNameDiv);
    }
    
})();