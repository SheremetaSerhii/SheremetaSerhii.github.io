function change(word) {
    //var newWord = new Array();
    var sameSymbol = {
        i: "і",
        n: "п",
        p: "р",
        a: "а",
        o: "о",
        c: "с"
    }
    /*for (var i = 0; i < word.length; i++) {
        if (sameSymbol.hasOwnProperty(word[i])) {
            newWord[i] = sameSymbol[word[i]];
        }
        else {
            newWord[i] = word[i];
        }
    }
    return newWord.join("");*/
    return word.split("").map(function (item) { if (sameSymbol.hasOwnProperty(item)) { return sameSymbol[item] } else { return item } }).join("");
}

console.log(change("function"));

// word = "function".split("");
// word = word.map(function(item) { return item += "1"});
// console.log(word);