function countSymbols(word) {
    var result = {};
    for (var i = 0; i < word.length; i++) {
        result.hasOwnProperty(word[i]) ? result[word[i]]++ : result[word[i]] = 1;
        // if (result.hasOwnProperty(word[i])) {
        //     result[word[i]]++;
        // } 
        // else {
        //     result[word[i]] = 1;
        // }
    }
    return result;
}

console.log(countSymbols("doroga"));
