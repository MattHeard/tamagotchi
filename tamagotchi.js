"use strict";

var t = {
    GameScreen: function (name) {
        return {
            content: "❌❌❌❌",

            setContent: function (text) {
                document.getElementsByClassName("content")[0].innerHTML = text;
            },

            redraw: function () {
                this.setContent(this.content);
            },

            getName: function () {
                return name;
            },

            getContent: function () {
                return this.content;
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
                }

                return message;
            }
        };
    }
};
