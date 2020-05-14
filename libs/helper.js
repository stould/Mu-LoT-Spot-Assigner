/**
 * Generates a random value between [lowerBound, upperBound]
 * @param lowerBound {Integer}
 * @param upperBound {Integer}
 */
export function getRandomIntBetween(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
}

/**
 * Generates a random value between [0, upperBound]
 * @param upperBound {Integer}
 */
export function getRandomInt(upperBound) {
    return Math.floor(Math.random() * (upperBound));
}

/**
 * Shuffles an array
 * @param array {array}
 */
export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}