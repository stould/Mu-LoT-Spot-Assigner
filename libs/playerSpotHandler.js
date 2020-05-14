import  {MAX_MEMBER_PER_SPOT,} from '../libs/constants';
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

    var wholePlayers = [
        ...playersGrantedLevel['easy'], 
        ...playersGrantedLevel['medium'],
        ...playersGrantedLevel['hard'],
    ];

    var asnwer = [];
    var n = wholePlayers.length;
    var m = spots.length;
    i = 0;
    j = 0;

    while(i < n && j < m) {

        var assignedSpot = {
            spot: spots[j],
            players: [wholePlayers[i],],
        };

        var counter = 1;
        while(counter < MAX_MEMBER_PER_SPOT && i + counter < n) {
            assignedSpot.players.push(wholePlayers[i + counter]);
            counter++;
        }

        asnwer.push(assignedSpot);
        i += counter;
        j += 1;
    }

    return asnwer;
}