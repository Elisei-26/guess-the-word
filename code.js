var words = ['alphabet', 'bicycle', 'cantonment', 'dolphin', 'elephant', 'folklore', 'goblin', 'hippopotamus', 'imagine', 'jaguar', 'kilometer', 'length', 'miracle', 'nature', 'orchestrate', 'proverb', 'quality', 'reality', 'samurai', 'tolerance', 'understand', 'visibility', 'wonder', 'xylofon', 'yesterday', 'zoology'];
var word = words[Math.floor(Math.random() * words.length)];;
var hidenWord = word;
var start = 1;

function pickWord() { //the function is called when the start button is pressed
    if (start === 1) { //this condition is intended to ensure that the start button is pressed after the restart button has been pressed at the round end
        start = 0;
        let leng = hidenWord.length;
        for (let i = 1; i < leng - 1; ++i) {
            hidenWord = setCharAt(hidenWord, i, '_');
        } // choose a word at random from the word list and exchange the letters inside the word with the character "_"
        let wordSplited = word.split("");
        let firstLetter = wordSplited[0];
        let lastLetter = wordSplited[leng - 1];
        completeFirstLastLetter(firstLetter);
        completeFirstLastLetter(lastLetter); // complete the first and last letter in the word, if they are also found inside the word
        document.getElementById("a").innerHTML = ('Try to guess the word: ' + hidenWord);
    } else {
        document.getElementById("a").innerHTML = ('Click on try again!');
    }
}

function completeFirstLastLetter(letter) {
    let position = word.indexOf(letter, 1);
    while (position !== -1) {
        hidenWord = setCharAt(hidenWord, position, letter);
        position = word.indexOf(letter, position + 1);
    }
}

function setCharAt(str, index, chr) { // the function replaces, in the string str on the index position, the current character with the character chr
    if(index > str.length - 1) {
        return str;
    }
    return str.substring(0, index) + chr + str.substring(index + 1);
}

var checkedLetters = "";
var nrOfAttempts = 15;

function checkAnswer() {
    if (start == 0) { // if start button was clicked
        let letter = document.getElementById("text").value;
        if (nrOfAttempts == '0') { // if the number of attempts ends
            alert("Number of attempts exceeded. Click on Try again!");
        } else if (word === "") { // if the start button was not pressed at the beginning
            document.getElementById("b").innerHTML = ('First click on start button');
        } else if (letter === "") { // if a letter was not typed before pressing the letter check button
            document.getElementById("b").innerHTML = ('Type one letter');
        } else { // general case
            let letterPosition = word.indexOf(letter, 0);
            if (letterPosition !== -1) { // if the typed letter is part of the word
                while (letterPosition !== -1) {
                    hidenWord = setCharAt(hidenWord, letterPosition, letter);
                    letterPosition = word.indexOf(letter, letterPosition + 1);
                }
            } else { // if the typed letter is not part of the word
                --nrOfAttempts;
                checkedLetters += letter;
            }
            let missingLetter = hidenWord.indexOf('_', 0);
            if (missingLetter === -1) { // if the word has been completed in its entirety
                document.getElementById("b").innerHTML = (hidenWord);
                document.getElementById("c").innerHTML = ("Congratulation!!! Click on try again to start another one!");
            } else { // if there are more letters to fill in the word
                document.getElementById("b").innerHTML = (hidenWord);
                document.getElementById("c").innerHTML = ('Checked letters: ' + checkedLetters);
                document.getElementById("d").innerHTML = ('Attempts left: ' + nrOfAttempts);
            }
        }
    } else { // if start button was not clicked
        document.getElementById("a").innerHTML = ('Click on Start button!');
    }
    return false;
}

function refresh() {
    start = 1;
    window.location.reload("Refresh");
}