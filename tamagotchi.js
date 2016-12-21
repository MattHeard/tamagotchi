"use strict";

var webkitSpeechRecognition,
    t = new Object();

t.CONTENT = { food: "\u{1F35E}\u{2753}\u{1F36C}" };

t.SpeechRecogniser = webkitSpeechRecognition;

t.changeContent = function (text) {
    document.getElementsByClassName("content")[0].innerHTML = text;
};

t.now = function () { return Date.now(); };

t.tick = function (tamagotchi) {
    return function () {
        tamagotchi.updateFullness();
        tamagotchi.refresh();
    };
};

t.animateContent = function () {
    document.getElementsByClassName("content")[0].className += " hello";
};

t.GameScreen = function (name, tamagotchi) {
    return {
        getName: function () { return name; },

        getContent: function () {
            if (name === "hunger") {
                var numberOfHearts = tamagotchi.fullness,
                    hearts = "\u{2764}".repeat(numberOfHearts),
                    numberOfCrosses = 4 - tamagotchi.fullness,
                    crosses = "\u{274C}".repeat(numberOfCrosses);
                return hearts + crosses;
            }

            if (name === "main") {
                if (tamagotchi.fullness === 4) { return "\u{1F63A}"; }

                return "\u{1F431}";
            }

            return t.CONTENT[name];
        },

        redraw: function () { t.changeContent(this.getContent()); },

        animate: function () { t.animateContent(); }
    };
};

t.Tamagotchi = function () {
    return {
        fullness: 0,
        gameScreen: new t.GameScreen("main", this),

        getGameScreenName: function () {
            return this.gameScreen.getName();
        },

        getGameScreenContent: function () {
            return this.gameScreen.getContent();
        },

        newGameScreen: function (name) {
            return new t.GameScreen(name, this);
        },

        changeGameScreen: function (name) {
            this.gameScreen = this.newGameScreen(name);
            this.refresh();
        },

        increaseFullness: function () {
            if (this.fullness !== 4) {
                this.fullness += 1;
                this.fullnessLastChanged = t.now();
            }
        },

        animate: function () {
            this.gameScreen.animate();
        },

        tell: function (message) {
            var i;
            if (message === "are you hungry") {
                this.changeGameScreen("hunger");
            } else if (message === "let's eat") {
                this.changeGameScreen("food");
            } else if (message === "where are you") {
                this.changeGameScreen("main");
            } else if (message === "have some bread") {
                for (i = 0; i < 4; i += 1) { this.increaseFullness(); }
                this.changeGameScreen("main");
            } else if (message === "have some candy") {
                this.increaseFullness();
                this.changeGameScreen("main");
            } else if (message === "hello") {
                this.animate();
            }

            return message;
        },

        refresh: function () { this.gameScreen.redraw(); },

        start: function () {
            this.fullnessLastChanged = t.now();
            this.refresh();
        },

        timeSinceFullnessLastChanged: function () {
            return t.now() - this.fullnessLastChanged;
        },

        updateFullness: function () {
            while (this.fullness > 0 && this.timeSinceFullnessLastChanged() > 60000) {
                this.fullness -= 1;
                this.fullnessLastChanged += 60000;
            }
        }
    };
};

window.addEventListener("load", function () {
    if (window.location.pathname.endsWith("/tamagotchi.html")) {
        var content = document.createElement("DIV");
        content.className = "content";
        document.body.appendChild(content);

        content.addEventListener("animationend", function () {
            content.classList.remove("hello");
        });

        t.tamagotchi = new t.Tamagotchi();
        t.tamagotchi.start();

        setInterval(t.tick(t.tamagotchi), 10000);

        t.speechRecogniser = new t.SpeechRecogniser();
        t.speechRecogniser.onend = function () { t.speechRecogniser.start(); };

        t.speechRecogniser.onresult = function () {
            var transcript = "", i;

            for (i = event.resultIndex; i < event.results.length; i += 1) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }

            console.log(transcript);
            t.tamagotchi.tell(transcript);
        };

        t.speechRecogniser.start();
    }
});

// Shortcut
function tell(message) { t.tamagotchi.tell(message); }
