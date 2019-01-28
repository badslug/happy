// Author: Iain Shigeoka
// Version: 1.0 | 2019-25-01
// License: Unlicense

// Happy Number Generator
// https://en.wikipedia.org/wiki/Happy_number

// A happy number is defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits in base-ten, and repeat the process until the number either equals 1 (where it will stay), or it loops endlessly in a cycle that does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers (or sad numbers).

// All unhappy numbers fall into an 8 number endless cycle. We save these and terminate when we see the
// number pop up.
// 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → ...
const terminators = new Set([4, 16, 37, 58, 89, 145, 42, 20])

// squares pre-calculates the squares of single integers so we don't need to actually do math
const squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

// thousands is the first set of happy numbers under 1000.
const thousands = new Set([1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100, 103, 109, 129, 130, 133, 139, 167, 176, 188, 190, 192, 193, 203, 208, 219, 226, 230, 236, 239, 262, 263, 280, 291, 293, 301, 302, 310, 313, 319, 320, 326, 329, 331, 338, 356, 362, 365, 367, 368, 376, 379, 383, 386, 391, 392, 397, 404, 409, 440, 446, 464, 469, 478, 487, 490, 496, 536, 556, 563, 565, 566, 608, 617, 622, 623, 632, 635, 637, 638, 644, 649, 653, 655, 656, 665, 671, 673, 680, 683, 694, 700, 709, 716, 736, 739, 748, 761, 763, 784, 790, 793, 802, 806, 818, 820, 833, 836, 847, 860, 863, 874, 881, 888, 899, 901, 904, 907, 910, 912, 913, 921, 923, 931, 932, 937, 940, 946, 964, 970, 973, 989, 998, 1000])

// digits returns an array of base-ten digits in the seed integer. We don't test if the seed is an integer -
// floats will be rounded down, non-numbers will crash.
function digits(seed) {
    let d = []
    while(seed > 9) {
        d.unshift(seed%10)   // unshift (rather than push) so our digits are in proper order
        seed = (seed/10 | 0) // force integer math - faster than Math.floor
    }
    d.unshift(seed) // final digit
    return d
}

// brute force testing if a seed is a happy number. Input must be an integer.
function brute(seed) {

    let previous = new Set()
    let result = {seed: seed, happy: true, steps:[]}

    while (seed !== 1) {
        let step = {seed: seed, parts:[]} // We track the steps used to calculate the brute force number
        let d = digits(seed)
        seed = 0
        for (let i = 0; i < d.length; i++) {
            let digit = d[i]
            let sq = squares[digit]
            seed += sq
            step.parts.push({digit:digit, square: sq})
        }
        step.sum = seed
        result.steps.push(step)
        if (seed === 1) {
            // Happy number verified
            break
        }
        if (previous.has(seed)) {
            // Loop detected, unhappy number
            result.happy = false
            break
        }
        // Track previous numbers to detect loops
        previous.add(seed)
    }
    return result
}

// happy tests if the seed is a happy number. Input must be an integer.
function happy(seed) {
    let result = {seed: seed, happy:true}
    // Anything in the pre-calculated happy number set is automatically match. This is a bit of a cheat but
    // assumes it's useful because most humans will guess numbers below 1000
    if (seed < 1001) {
        result.happy = thousands.has(seed)
        result.end = Date.now()
        return result
    }
    // Actually test the seed
    do {
        // we know the terminating sequence contains these seeds so we can immediately bail when we see them
        // no need to track previous steps.
        if (terminators.has(seed)) {
            result.happy = false
            return result
        }
        // perform the happy number calculation
        let d = digits(seed)
        seed = 0
        for (let i = 0; i < d.length; i++) {
            seed += squares[d[i]]
        }
    } while(seed !== 1)

    return result
}

// search returns the requested number of happy numbers that follow the given seed and use the given test program.
// For example, using search(1, 5, brute) will return
function search(seed, count, test) {
    let found = {
        happy:[],           // happy numbers that were found
        tested: [],         // test results to find the desired count of happy numbers
        start: Date.now(),  // time the search started
    }
    let happy = found.happy
    for (let current = seed+1; happy.length < count; current++) {
        let run = test(current)
        found.tested.push(run)
        if (run.happy) {
            happy.push(current)
        }
    }
    found.end = Date.now() // tme the search ended
    return found
}

// Search for 5 lucky numbers starting after 1 using the brute force algorithm
let first = search(1, 5, brute)
console.log('brute force lucky numbers', first.happy, 'results', first)

// Search for the same using the optimized happy algorithm
let second = search(1, 5, happy)
console.log('optimized lucky numbers', second.happy, 'results', second)