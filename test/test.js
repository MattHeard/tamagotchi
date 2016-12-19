QUnit.test("Tamagotchi type is defined", function(assert) {
  assert.ok(Tamagotchi, "Passed!");
});

QUnit.test("Tamagotchi can be instantiated", function(assert) {
  assert.ok(new Tamagotchi(), "Passed!");
});

QUnit.test("The first screen is the main screen", function(assert) {
  tamagotchi = new Tamagotchi();
  assert.equal(tamagotchi.screen, "main");
});

QUnit.test("A tamagotchi can be told something", function(assert) {
  tamagotchi = new Tamagotchi();
  assert.ok(tamagotchi.tell("hello"));
});
