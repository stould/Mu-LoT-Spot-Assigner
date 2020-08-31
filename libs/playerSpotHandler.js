import  {HS_SPOTS, REGULAR_SPOTS} from '../libs/constants';
import  {shuffleArray,} from '../libs/helper';

function playerGrantedLevel(playerLevel) {
    if(playerLevel == 0) {
        return 'easy';
    } else if(playerLevel == 1) {
        return 'medium';
    } else {
        return 'hard';
    }
}

/**
 * Assigns players to each spot pseudo randomly 
 * accordingly to their levels and spot difficulty
 * 
 ** Returns an array of objects like:
 * [
 *  {players[], spot},
 *  {players[], spot},
 *  ...
 * ]
 * 
 * @param array {spots}
 * @param array {players}
 * 
 */
export function assignSpots(spots, players, spotType) {
    var splitedSpots = new Map();

    splitedSpots['easy'] = [];
    splitedSpots['medium'] = [];
    splitedSpots['hard'] = [];
    var i, j;

    for(i = 0; i < spots.length; i++) {
        const spot = spots[i];
        splitedSpots[spot.spotLevel].push(spot);
    }

    var sortedSpots = [
        ...splitedSpots['easy'],
        ...splitedSpots['medium'],
        ...splitedSpots['hard'],
    ];

    var playersGrantedLevel = new Map();
    playersGrantedLevel['easy'] = [];
    playersGrantedLevel['medium'] = [];
    playersGrantedLevel['hard'] = [];

    for(i = 0; i < players.length; i++) {
        var player = players[i];
        playersGrantedLevel[playerGrantedLevel(player.level)].push(player);
    }

    shuffleArray(playersGrantedLevel['easy']);
    shuffleArray(playersGrantedLevel['medium']);
    shuffleArray(playersGrantedLevel['hard']);

    var sortedPlayers = [
        ...playersGrantedLevel['easy'], 
        ...playersGrantedLevel['medium'],
        ...playersGrantedLevel['hard'],
    ];

    var asnwer = [];
    var n = sortedPlayers.length;
    var m = sortedSpots.length;
    
    i = 0;
    j = 0;

    while(i < n && j < m) {
        asnwer.push({
            players: [sortedPlayers[i],],
            spot: sortedSpots[j],
        });

        i += 1;
        j += 1;
    }

    if(n > (spotType == 'hs' ? HS_SPOTS.length : REGULAR_SPOTS.length)) {
        while(i < n) {
            asnwer[j % m].players.push(sortedPlayers[i]);
            i += 1;
            j += 1;
        }
    }

    return asnwer;
}