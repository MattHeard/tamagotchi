"use strict";

var t = {
    CONTENT: {
        main: "\u{1F431}",
        hunger: "\u{274C}\u{274C}\u{274C}\u{274C}",
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
                    return "\u{2764}".repeat(tamagotchi.getFullness()) + "\u{274C}".repeat(4 - tamagotchi.getFullness());
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

            tell: function (message) {
                if (message === "are you hungry?") {
                    this.gameScreen = this.newGameScreen("hunger");
                    this.refresh();
                } else if (message === "let's eat") {
                    this.gameScreen = this.newGameScreen("food");
                    this.refresh();
                } else if (message === "where are you?") {
                    this.gameScreen = this.newGameScreen("main");
                    this.refresh();
                } else if (message === "have some bread") {
                    this.fullness = 4;
                    this.gameScreen = this.newGameScreen("main");
                    this.refresh();
                } else if (message === "have some candy") {
                    if (this.fullness != 4) {
                        this.fullness += 1;
                    }
                    this.gameScreen = this.newGameScreen("main");
                    this.refresh();
                }

                return message;
            },

            refresh: function () { this.gameScreen.redraw(); }
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
