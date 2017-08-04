/*
* Computes standard deviation of an array of data assuming weight of 1 per element
*/
function stdev(arr) {
    let avg = arr.reduce((a, b) => a + b);
    return arr.reduce(arr, (a, b) => a + (b - avg) * (b - avg)) / arr.length;
}
