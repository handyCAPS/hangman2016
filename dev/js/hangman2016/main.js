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


function runTheMan() {
    [].forEach.call(get('.stick'), function(stick, i) {
        stick.classList.add('hidden');
        window.setTimeout(function() {
            stick.classList.remove('hidden');
        }, (i + 1) * 500);
    });
}

function getLetterBox() {
    var letterBox = document.createElement('div');
    letterBox.classList.add('letter');
    return letterBox;
}

function addLettersToLetterBoard(word) {
    var lBoard = get('.letterBoard')[0];
    var wordArray = splitWord(word);
    wordArray.forEach(function() {
        lBoard.appendChild(getLetterBox());
    });
}

function addWordToBoard() {
    addLettersToLetterBoard('testing');
}

function setLetter(letter, word) {
    var indexes = findIndexes(letter, word);
    indexes.forEach(function(idx) {
        get('.letter')[idx].appendChild(document.createTextNode(letter));
    });
}

