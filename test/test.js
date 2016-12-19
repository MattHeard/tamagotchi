QUnit.test("Tamagotchi type is defined", function(assert) {
  assert.ok(t.Tamagotchi);
});

QUnit.test("Tamagotchi can be instantiated", function(assert) {
  assert.ok(new t.Tamagotchi());
});

QUnit.test("The first screen is the main screen", function(assert) {
  tamagotchi = new t.Tamagotchi();
  assert.equal(tamagotchi.screen, "main");
});

QUnit.test("A tamagotchi can be told something", function(assert) {
  tamagotchi = new t.Tamagotchi();
  assert.ok(tamagotchi.tell("hello"));
});

QUnit.test("Telling a tamagotchi 'are you hungry?' will open the hunger screen",
        function(assert) {
  tamagotchi = new t.Tamagotchi();
  tamagotchi.tell("are you hungry?");
  assert.equal(tamagotchi.screen, "hunger");
});
