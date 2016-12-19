"use strict";

var t = {
    changeContent: function (text) {
        document.getElementsByClassName("content")[0].innerHTML = text;
    },

    GameScreen: function (name) {
        return {
            getName: function () {
                return name;
            },

            getContent: function () {
                if (name === "main") {
                    return "\u{1F431}";
                }

                return "\u{274C}\u{274C}\u{274C}\u{274C}";
            },

            redraw: function () {
                t.changeContent(this.getContent());
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
                } else {
                    this.gameScreen = new t.GameScreen("main");
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

window.addEventListener("load", function () {
    if (window.location.pathname === "/tamagotchi.html") {
        var content = document.createElement("DIV");
        content.className = "content";
        document.body.appendChild(content);

        t.tamagotchi = new t.Tamagotchi();
        t.tamagotchi.refresh();
    }
});

// Shortcut
function tell(message) {
    t.tamagotchi.tell(message);
}
