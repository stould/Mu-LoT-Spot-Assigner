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