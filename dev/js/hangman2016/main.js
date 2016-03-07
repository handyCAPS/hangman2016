/* jshint unused:false */


(function(){document.getElementsByTagName('html')[0].classList.remove('no-js');})();


var Events = (function() {

    var topics = {};

    return {

        subscribe: function(topic, callback) {

            if (!topics[topic]) { topics[topic] = { queue:[] }; }

            var index = topics[topic].queue.push(callback) - 1;

            return {

                remove: function() {

                    delete topics[topic].queue[index];

                }

            };

        },

        publish: function(topic, info) {

            if (!topics[topic] || !topics[topic].queue.length) { return; }

            var callbacks = topics[topic].queue;

            callbacks.forEach(function(cb) {
                cb(info || {});
            });

        }

    };

}());

function get(el) {
    return document['querySelector' + (el.indexOf('#') !== 0 ? 'All' : '')](el);
}

function splitWord(word) {
    return word.split('');
}

function findIndexes(letter, word) {
    var indexes = [],
        lastIndex = word.indexOf(letter);
    while (lastIndex !== -1) {
        indexes.push(lastIndex);
        lastIndex = word.indexOf(letter, lastIndex + 1);
    }
    return indexes;
}

var HangMan = (function() {
    var board = get('.board')[0],
        sticks = get('.stick');

    function runTheMan() {
        [].forEach.call(get('.stick'), function(stick, i) {
            stick.classList.add('hidden');
            window.setTimeout(function() {
                stick.classList.remove('hidden');
            }, (i + 1) * 500);
        });
    }

    function hideTheSticks() {
        [].forEach.call(sticks, function(stick) {
            stick.classList.add('hidden');
        });
    }

    function showStick(stick) {
        sticks[stick].classList.remove('hidden');
    }

    function getSticks(getNumber) {
        return getNumber ? sticks.length : sticks;
    }

    return {
        hideTheSticks: hideTheSticks,
        showStick: showStick,
        getSticks: getSticks
    };

}());

var LetterBoard = (function() {

    var board = get('.letterBoard')[0],
        wordToGuess = '',
        guesses = 0,
        guessedLetters = [],
        rightGuessedLetters = [],
        guessesAllowed = HangMan.getSticks(true),
        wrongGuesses = 0,
        wrongGuessedLetters = [],
        dead = false,
        winner = false;

    function getLetterBox() {
        var letterBox = document.createElement('div');
        letterBox.classList.add('letter','letterGood');
        return letterBox;
    }

    function addLettersToLetterBoard() {
        var wordArray = splitWord(wordToGuess);
        wordArray.forEach(function() {
            board.appendChild(getLetterBox());
        });
    }

    function setLetter(letter) {
        var indexes = findIndexes(letter, wordToGuess);
        indexes.forEach(function(idx) {
            rightGuessedLetters.push(letter);
            get('.letterGood')[idx].appendChild(document.createTextNode(letter));
        });
    }

    function setWord(word) {
        wordToGuess = word;
        addLettersToLetterBoard();
    }

    function guessLetter(letter) {
        if (guessedLetters.indexOf(letter) !== -1) { return; }
        guesses++;
        guessedLetters.push(letter);
        if (wordToGuess.indexOf(letter) !== -1) {
            letterGood(letter);
        } else {
            letterWrong(letter);
        }
    }

    function letterGood(letter) {
        setLetter(letter);
    }

    function letterWrong(letter) {
        HangMan.showStick(wrongGuesses);
        wrongGuessedLetters.push(letter);
        get('.letterWrong')[wrongGuesses].appendChild(document.createTextNode(letter));
        wrongGuesses++;
    }

    function deadOrWinner() {
        if (guessesAllowed === wrongGuesses) { dead = true; }
        if (rightGuessedLetters.length === wordToGuess.length) { winner = true; }
    }

    return {
        setWord: setWord,
        guessLetter: guessLetter
    };

}());



function listenForGuess() {
    get('#guess').addEventListener('keyup', function(event) {
        var letter = this.value.trim();
        var isGood = LetterBoard.guessLetter(letter);
        console.log(this.value);
        this.value = '';
    });
}


function runTheMan() {
    [].forEach.call(get('.stick'), function(stick, i) {
        stick.classList.add('hidden');
        window.setTimeout(function() {
            stick.classList.remove('hidden');
        }, (i + 1) * 500);
    });
}