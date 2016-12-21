"use strict";

var webkitSpeechRecognition,
    t = {};

t.EMOJI = {
    BREAD: "\u{1F35E}",
    CANDY: "\u{1F36C}",
    CAT_FACE: "\u{1F431}",
    CROSS: "\u{274C}",
    HEART: "\u{2764}",
    QUESTION_MARK: "\u{2753}",
    SMILING_CAT_FACE_WITH_OPEN_MOUTH: "\u{1F63A}",
    THOUGHT_BALLOON: "\u{1F4AD}"
};

t.SpeechRecogniser = webkitSpeechRecognition;

t.changeContent = function (text) {
    document.getElementsByClassName("content")[0].innerHTML = text;
};

t.now = function () { return Date.now(); };

t.tick = function (tamagotchi) {
    return function () {
        tamagotchi.updateFullness();
        tamagotchi.updateDesire();
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
                    hearts = t.EMOJI.HEART.repeat(numberOfHearts),
                    numberOfCrosses = 4 - tamagotchi.fullness,
                    crosses = t.EMOJI.CROSS.repeat(numberOfCrosses);
                return hearts + crosses;
            }

            if (name === "main") {
                if (tamagotchi.fullness === 4) {
                    return t.EMOJI.SMILING_CAT_FACE_WITH_OPEN_MOUTH;
                }

                return t.EMOJI.CAT_FACE;
            }

            if (name === "desire") {
                return t.EMOJI.CAT_FACE + t.EMOJI.THOUGHT_BALLOON + t.EMOJI.BREAD;
            }

            return t.EMOJI.BREAD + t.EMOJI.QUESTION_MARK + t.EMOJI.CANDY;
        },

        redraw: function () { t.changeContent(this.getContent()); },

        animate: function () { t.animateContent(); }
    };
};

t.Tamagotchi = function () {
    return {
        desireTicks: 0,
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

        isHungry: function () {
            return this.fullness === 0;
        },

        tell: function (message) {
            var triggers = new Map();
            triggers.set("hunger", /hungry/);
            triggers.set("food", /(food|eat)/);
            triggers.set("main", /^where are you$/);

            var i,
                feedMealTrigger = /bread/,
                feedSnackTrigger = /candy|lollies|lolly|snack/,
                bounceTrigger = /hello/,
                desireTrigger = /^what do you (want|need)$/;

            if (feedMealTrigger.test(message)) {
                for (i = 0; i < 4; i += 1) { this.increaseFullness(); }
                this.changeGameScreen("main");
                return message;
            }

            if (feedSnackTrigger.test(message)) {
                this.increaseFullness();
                this.changeGameScreen("main");
                return message;
            }

            if (this.getGameScreenName() === "main" && bounceTrigger.test(message)) {
                this.animate();
                return message;
            }

            if (this.isHungry() && desireTrigger.test(message)) {
                this.changeGameScreen("desire");
                return message;
            }

            for (var [screen, utterances] of triggers) {
                if (utterances.test(message) && this.getGameScreenName() !== screen) {
                    this.changeGameScreen(screen);
                    return message;
                }
            }
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
        },

        updateDesire: function () {
            if (this.desireTicks > 0) {
                this.desireTicks = 0;
                this.changeGameScreen("main");
                return;
            }

            if (this.getGameScreenName() === "desire") {
                this.desireTicks += 1;
            }
        }
    };
};


window.addEventListener("load", function () {
    if (window.location.pathname.endsWith("/tamagotchi.html")) {
        var content = document.getElementsByClassName("content")[0];
        content.addEventListener("animationend", function () {
            content.classList.remove("hello");
        });

        t.tamagotchi = new t.Tamagotchi();
        t.tamagotchi.start();

        setInterval(t.tick(t.tamagotchi), 10000);

        var utterance = document.getElementsByClassName("utterance")[0];

        t.speechRecogniser = new t.SpeechRecogniser();
        t.speechRecogniser.onend = function () { t.speechRecogniser.start(); };

        t.speechRecogniser.onresult = function () {
            var transcript = "", i;

            for (i = event.resultIndex; i < event.results.length; i += 1) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }

            utterance.innerText = transcript;
            t.tamagotchi.tell(transcript);
        };

        t.speechRecogniser.start();
    }
});

// Shortcut
function tell(message) { t.tamagotchi.tell(message); }
