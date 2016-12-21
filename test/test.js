QUnit.module("Tamagotchi", {
    before: function() {
        // Stub out UI methods
        t.changeContent = function () { };
        t.animateContent = function () { };
    }
});

QUnit.test("Tamagotchi type is defined", function(assert) {
    assert.ok(t.Tamagotchi);
});

QUnit.test("Tamagotchi can be instantiated", function(assert) {
    assert.ok(new t.Tamagotchi());
});

QUnit.test("The first screen is the main screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    assert.equal(tamagotchi.getGameScreenName(), "main");
});

QUnit.test("A new tamagotchi shows 🐱", function(assert) {
    tamagotchi = new t.Tamagotchi();
    assert.equal(tamagotchi.getGameScreenContent(), "🐱");
});

QUnit.test("A tamagotchi can be told something", function(assert) {
    tamagotchi = new t.Tamagotchi();
    assert.ok(tamagotchi.tell("hello"));
});

QUnit.test("'where are you' will open the main screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("are you hungry"); // Open another screen
    tamagotchi.tell("where are you");
    assert.equal(tamagotchi.getGameScreenName(), "main");
});

QUnit.test("'how hungry are you' will open the hunger screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("how hungry are you");
    assert.equal(tamagotchi.getGameScreenName(), "hunger");
});

QUnit.test("'are you very hungry' will open the hunger screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("are you very hungry");
    assert.equal(tamagotchi.getGameScreenName(), "hunger");
});

QUnit.test("'are you really hungry' will open the hunger screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("are you really hungry");
    assert.equal(tamagotchi.getGameScreenName(), "hunger");
});

QUnit.test("'hungry' will open the hunger screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("hungry");
    assert.equal(tamagotchi.getGameScreenName(), "hunger");
});

QUnit.test("'are you hungry' will open the hunger screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenName(), "hunger");
});

QUnit.test("'do you need any food' will open the food screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("do you need any food");
    assert.equal(tamagotchi.getGameScreenName(), "food");
});

QUnit.test("'want something to eat' will open the food screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("want something to eat");
    assert.equal(tamagotchi.getGameScreenName(), "food");
});

QUnit.test("'do you want something to eat' will open the food screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("do you want something to eat");
    assert.equal(tamagotchi.getGameScreenName(), "food");
});

QUnit.test("'let's eat' will open the food screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    assert.equal(tamagotchi.getGameScreenName(), "food");
});

QUnit.test("A hungry tamagotchi shows 4 ❌ marks", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.howWellFed = 0;
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❌❌❌❌");
});

QUnit.test("The food screen offers some bread or candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    assert.equal(tamagotchi.getGameScreenContent(), "🍞❓🍬");
});

QUnit.test("'eat some bread' will feed bread", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("eat some bread");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❤❤❤");
});

QUnit.test("'have some bread' will feed bread", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some bread");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❤❤❤");
});

QUnit.test("'want a snack' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("want a snack");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("'want some candy' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("want some candy");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("'want a lolly' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("want a lolly");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("'want some lollies' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("want some lollies");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("'eat some candy' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("eat some candy");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("'have some candy' will feed candy", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some candy");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});


QUnit.test("'do you want some bread' will feed bread", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("do you want some bread");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❤❤❤");
});

QUnit.test("Feeding bread will open the main screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some bread");
    assert.equal(tamagotchi.getGameScreenName(), "main");
});

QUnit.test("Feeding candy will open the main screen", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some candy");
    assert.equal(tamagotchi.getGameScreenName(), "main");
});

QUnit.test("Feeding bread will make the cat full", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some bread");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❤❤❤");
});

QUnit.test("Feeding candy fills one heart", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some candy");
    tamagotchi.tell("are you hungry");
    assert.equal(tamagotchi.getGameScreenContent(), "❤❌❌❌");
});

QUnit.test("The cat smiles when full", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some bread");
    tamagotchi.tell("where are you");
    assert.equal(tamagotchi.getGameScreenContent(), "😺");
});

QUnit.test("'eat some bread' on the food menu makes the cat full", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("eat some bread");
    assert.equal(tamagotchi.getGameScreenContent(), "😺");
});

QUnit.test("'what do you want' when hungry shows 🐱💭🍞", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("what do you want");
    assert.equal(tamagotchi.getGameScreenContent(), "🐱💭🍞");
});

QUnit.test("do not desire food when not hungry", function(assert) {
    tamagotchi = new t.Tamagotchi();
    tamagotchi.tell("let's eat");
    tamagotchi.tell("have some bread");
    tamagotchi.tell("what do you want");
    assert.notEqual(tamagotchi.getGameScreenContent(), "🐱💭🍞");
});
