"use strict";

var t = {
    Screen: function () {
        return {
            content: "❌❌❌❌",

            setContent: function (text) {
                document.getElementsByClassName("content")[0].innerHTML = text;
            },

            redraw: function () {
                this.setContent(this.content);
            }
        };
    },

    Tamagotchi: function () {
        return {
            getScreen: function () {
                return new t.Screen();
            },

            screen_name: "main",

            tell: function (message) {
                if (message === "are you hungry?") {
                    this.screen = "hunger";
                }

                return message;
            }
        };
    }
};
