"use strict";

var t = {
    Tamagotchi: function () {
        return {
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
