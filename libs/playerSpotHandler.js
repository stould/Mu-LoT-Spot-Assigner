import  {MAX_MEMBER_PER_SPOT, MAX_SPOTS,} from '../libs/constants';
import  {shuffleArray,} from '../libs/helper';

export function playerGrantedLevel(playerLevel) {
    if(playerLevel <= 500) {
        return 'easy';
    } else if(playerLevel <= 600) {
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
export function assignSpots(spots, players) {
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
    

    if(n <= MAX_SPOTS) {
        console.log('A');
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
    } else {
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

        while(i < n) {
            j = 0;
            while(i < n && j < m) {
                asnwer[j].players.push(sortedPlayers[i]);
                console.log(asnwer[j]);
                i += 1;
                j += 1;
            }
        }
    }

    return asnwer;
}