"use strict";

var t = {
    Screen: function () {
        return {
            content: "❌❌❌❌"
        };
    },

    Tamagotchi: function () {
        return {
            getScreen: function () {
                return new t.Screen();
            },

            screen: "main",

            tell: function (message) {
                if (message === "are you hungry?") {
                    this.screen = "hunger";
                }

                return message;
            }
        };
    }
};
