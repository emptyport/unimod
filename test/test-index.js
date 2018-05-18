var unimod = require('../index');
var test = require('tape');

test('Default Settings', function(t) {
  var oxidation = unimod.getByName('oxidation');
  var uppercaseOxidation = unimod.getByName('Oxidation');
  var biotin = unimod.getById(3);

  t.equal(15.994915, oxidation['mono_mass'], 'Correctly retrieved oxidation by name');
  t.equal(oxidation['avge_mass'], uppercaseOxidation['avge_mass'], 'Case insensitive');
  t.equal('Biotin', biotin['name'], 'Correctly retrieved biotin by ID');
  t.end();
});

