function change(word) {
    var newWord = new Array();
    var sameSymbol = {
        i: "і",
        n: "п",
        p: "р",
        a: "а",
        o: "о",
        c: "с"
    }
    for (var i = 0; i < word.length; i++) {
        if (sameSymbol.hasOwnProperty(word[i])) {
            newWord[i] = sameSymbol[word[i]];
        }
        else {
            newWord[i] = word[i];
        }
    }
    return newWord.join("");
}

console.log(change("function"));