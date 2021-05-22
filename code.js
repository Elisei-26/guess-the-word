var words = ['alfabet', 'bicicleta', 'cantonament', 'delfin', 'elefant', 'folclor', 'ghiocel', 'hipopotam', 'iepure', 'jaguar', 'kilometru', 'licurici', 'motocultor', 'nedrept', 'orchestrat', 'proverb', 'realitate', 'samurai', 'telefon', 'urmarit', 'vitezoman', 'xilofon', 'zadarnic'];
var word = "";
var nrOfAttempts;
var hidenWord;
var checkedLetters;
var start = 1;

function pickWord() {//functia este apelata in momentul apasarii pe butonul de start
    if (start === 1) {//conditia asta are rolul de a se asigura ca butonul de start se apasa dupa ce butonul de restart a fost apasat, asta in cazul in care a fost jucata o runda inainte
        start = 0;
        nrOfAttempts = 15;
        checkedLetters = "";
        word = words[Math.floor(Math.random()*words.length)];
        hidenWord = word;
        var leng = hidenWord.length;
        for (var i = 1; i < leng - 1; ++i) {
            hidenWord = setCharAt(hidenWord, i, '_');
        }//aleg un cuvant la intamplare din lista de cuvinte si schimb literele din interiorul cuvantului cu _
        var wordSplited = word.split("");
        var firstLetter = wordSplited[0];
        var lastLetter = wordSplited[leng - 1];
        completeFirstLastLetter(firstLetter);
        completeFirstLastLetter(lastLetter);
        //completez prima si ultima litera in cuvant, asta daca se regasesc si in interionul cuvantului
        document.getElementById("a").innerHTML = ('Try to guess the word: ' + hidenWord);
    } else {
        document.getElementById("a").innerHTML = ('Click on try again!');
    }
}

function completeFirstLastLetter(letter) {
    var position = word.indexOf(letter, 1);
    while (position !== -1) {
        hidenWord = setCharAt(hidenWord, position, letter);
        position = word.indexOf(letter, position + 1);
    }
}

function setCharAt(str,index,chr) {//functia inlocuieste, in stringul str pe pozitia index, caracterul curent cu caracterul chr
    if(index > str.length-1) {
        return str;
    }
    return str.substring(0,index) + chr + str.substring(index+1);
}

function checkAnswer() {
    var letter = document.getElementById("text").value;
    if (nrOfAttempts == 0) {//cazul in care se termina numarul de incercari
        alert("Number of attempts exceeded. Click on Try again!");
    } else if (word === "") {//cazul in care nu s-a apasat butonul de start la inceput
        document.getElementById("b").innerHTML = ('First click on start button');
    } else if (letter === "") {//cazul in care nu s-a tastat o litera inainte de apasarea butonului verificare litera
        document.getElementById("b").innerHTML = ('Type one letter');
    } else {//caz general
        var letterPosition = word.indexOf(letter, 0);
        if (letterPosition !== -1) {//cazul in care litera tastata face parte din cuvant
            while (letterPosition !== -1) {
                hidenWord = setCharAt(hidenWord, letterPosition, letter);
                letterPosition = word.indexOf(letter, letterPosition + 1);
            }
        } else {//cazul in care litera tastata nu face parte din cuvant
            --nrOfAttempts;
            checkedLetters += letter;
        }
        var missingLetter = hidenWord.indexOf('_', 0);
        if (missingLetter === -1) {//cazul in care cuvantul a fost completat in intregime
            document.getElementById("b").innerHTML = (hidenWord);
            document.getElementById("c").innerHTML = ("Congratulation!!! Click on try again to start another one!");
        } else {//cazul in care mai sunt litere de completat in cuvant
            document.getElementById("b").innerHTML = (hidenWord);
            document.getElementById("c").innerHTML = ('Checked letters: ' + checkedLetters);
            document.getElementById("d").innerHTML = ('Attempts left: ' + nrOfAttempts);
        }
    }
    return false;
}

function refresh() {
    start = 1;
    window.location.reload("Refresh");
}