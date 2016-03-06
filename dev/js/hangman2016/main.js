/* jshint unused:false */


(function(){document.getElementsByTagName('html')[0].classList.remove('no-js');})();

(function() {

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


}());