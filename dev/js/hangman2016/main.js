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



function runTheMan() {
    [].forEach.call(get('.stick'), function(stick, i) {
        stick.classList.add('hidden');
        window.setTimeout(function() {
            stick.classList.remove('hidden');
        }, (i + 1) * 500);
    });
}