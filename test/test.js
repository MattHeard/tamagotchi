QUnit.test("Tamagotchi type is defined", function(assert) {
  assert.ok(Tamagotchi, "Passed!");
});

QUnit.test("Tamagotchi can be instantiated", function(assert) {
  assert.ok(new Tamagotchi(), "Passed!");
});
