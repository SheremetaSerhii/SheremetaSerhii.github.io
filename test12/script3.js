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
    /////////////////// NEW ///////////////////
    newWord = word.split("");
    console.log(newWord);
    //newWord.map(function(item) {return item = item + "1"});
    newWord.map(function(item) { return item += "1"});
    // for (var i = 0; i < newWord.length; i++) {
    //     newWord[i] += "1";
    // }
    console.log(newWord);
    //var newWord = new Array();
    //newWord = word.map(function { return "1" });
    return newWord.join("");
}

//console.log(change("function"));

word = "function".split("");
word.map(function(item) { return item += "1"});
console.log(word);