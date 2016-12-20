"use strict";

var t = {
    CONTENT: {
        main: "\u{1F431}",
        food: "\u{1F35E}\u{2753}\u{1F36C}"
    },

    changeContent: function (text) {
        document.getElementsByClassName("content")[0].innerHTML = text;
    },

    GameScreen: function (name, tamagotchi) {
        return {
            getName: function () { return name; },

            getContent: function () {
                if (name === "hunger") {
                    var fullness = tamagotchi.getFullness();
                    var numberOfHearts = fullness;
                    var hearts = "\u{2764}".repeat(numberOfHearts);
                    var numberOfCrosses = 4 - fullness;
                    var crosses = "\u{274C}".repeat(numberOfCrosses);
                    return hearts + crosses;
                }

                return t.CONTENT[name];
            },

            redraw: function () { t.changeContent(this.getContent()); }
        };
    },

    Tamagotchi: function () {
        return {
            fullness: 0,
            gameScreen: new t.GameScreen("main", this),

            getFullness: function () { return this.fullness; },
            getGameScreen: function () { return this.gameScreen; },

            getGameScreenName: function () {
                return this.gameScreen.getName();
            },

            getGameScreenContent: function () {
                return this.gameScreen.getContent();
            },

            newGameScreen: function (name) {
                return new t.GameScreen(name, this);
            },

            changeGameScreen: function(name) {
                this.gameScreen = this.newGameScreen(name);
                this.refresh();
            },

            tell: function (message) {
                if (message === "are you hungry?") {
                    this.changeGameScreen("hunger");
                } else if (message === "let's eat") {
                    this.changeGameScreen("food");
                } else if (message === "where are you?") {
                    this.changeGameScreen("main");
                } else if (message === "have some bread") {
                    this.fullness = 4;
                    this.changeGameScreen("main");
                } else if (message === "have some candy") {
                    if (this.fullness != 4) { this.fullness += 1; }
                    this.changeGameScreen("main");
                }

                return message;
            },

            refresh: function () { this.gameScreen.redraw(); },
        };
    }
};

window.addEventListener("load", function () {
    if (window.location.pathname.endsWith("/tamagotchi.html")) {
        var content = document.createElement("DIV");
        content.className = "content";
        document.body.appendChild(content);

        t.tamagotchi = new t.Tamagotchi();
        t.tamagotchi.refresh();
    }
});

// Shortcut
function tell(message) { t.tamagotchi.tell(message); }
