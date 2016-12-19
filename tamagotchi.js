"use strict";

var t = {
    GameScreen: function (name) {
        return {
            setContent: function (text) {
                document.getElementsByClassName("content")[0].innerHTML = text;
            },

            getName: function () {
                return name;
            },

            getContent: function () {
                if (name === "main") {
                    return "\u{1F431}";
                } else {
                    return "\u{274C}\u{274C}\u{274C}\u{274C}";
                }
            },

            redraw: function () {
                this.setContent(this.getContent());
            }
        };
    },

    Tamagotchi: function () {
        return {
            gameScreen: new t.GameScreen("main"),

            getGameScreen: function () {
                return this.gameScreen;
            },

            getGameScreenName: function () {
                return this.gameScreen.getName();
            },

            getGameScreenContent: function () {
                return this.gameScreen.getContent();
            },

            tell: function (message) {
                if (message === "are you hungry?") {
                    this.gameScreen = new t.GameScreen("hunger");
                    this.refresh();
                }

                return message;
            },

            refresh: function () {
                this.gameScreen.redraw();
            }
        };
    }
};

window.addEventListener("load", function() {
    t.tamagotchi = new t.Tamagotchi();
    t.tamagotchi.refresh();
});
