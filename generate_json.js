// Michael Porter 2018

function removeQuotes(s) {
  return s.replace(new RegExp('"', 'g'),"");
}

var fs = require('fs');
var filename = 'unimod.obo';

var unimod_definitions = {};

fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  var lines = data.split(/\r?\n/);
  var begin_term = false;

  var current_mod = {};

  lines.forEach(function(line){
    if(line === '[Term]') {
      begin_term = true;
      current_mod = {};
    }
    if(line === '') {
      begin_term = false;
      if(current_mod['name'] === undefined || current_mod['name'] === 'unimod root node') {
        return;
      }
      unimod_definitions[current_mod['name'].toLowerCase()] = current_mod;
    }

    if(begin_term) {
      var key = line.split(':')[0];

      switch(key) {
        case 'id':
          var id = line.split(':')[2];
          current_mod['id'] = id;
          break;

        case 'name':
          var name = line.split(': ')[1];
          current_mod['name'] = name;
          break;

        case 'xref':
          var item = line.split(' ')[1];
          switch(item) {
            case 'delta_composition':
              var composition = line.split('xref: delta_composition ')[1];
              current_mod['composition'] = removeQuotes(composition);
              break;

            case 'delta_mono_mass':
              var mono_mass = line.split('xref: delta_mono_mass ')[1];
              current_mod['mono_mass'] = parseFloat(removeQuotes(mono_mass));
              break;

            case 'delta_avge_mass':
              var avge_mass = line.split('xref: delta_avge_mass ')[1];
              current_mod['avge_mass'] = parseFloat(removeQuotes(avge_mass));
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    }
  });

  fs.writeFile('./unimod.json', JSON.stringify(unimod_definitions, null, 2), function(err){
    if (err) throw err;
  });
});





/*
var all_isotopes = [];

fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  var lines = data.split(/\r?\n/);
  var currentIsotope = {}

  lines.forEach(function(line){
    if (line === '') { 
      all_isotopes.push(currentIsotope);
      currentIsotope = {};
      return;
    }
    var key = line.split('=')[0].trim();
    var val = line.split('=')[1].trim();
    currentIsotope[key] = val;
  });

  real_isotopes = {};

  all_isotopes.forEach(function(isotope){
    var symbol = isotope['Atomic Symbol'];
    var mass = isotope['Relative Atomic Mass'].replace(/\(\d{0,}\)/, '');
    var abundance = isotope['Isotopic Composition'].replace(/\(\d{0,}\)/, '');

    if (abundance === '') return;

    if (!(symbol in real_isotopes)){
      real_isotopes[symbol] = [];
    }

    real_isotopes[symbol].push([parseFloat(mass), parseFloat(abundance)]);

    if (symbol === 'D') real_isotopes['H'].push([parseFloat(mass), parseFloat(abundance)]);
  });

  for (var key in real_isotopes) {
    var iso_list = real_isotopes[key];
    var iso_data = [];
    var numerator = 0.0;
    var denominator = 0.0;
    var avg_mass;
    iso_list.forEach(function(entry){
      numerator += entry[0] * entry[1];
      denominator += entry[1];
      iso_data.push({
        'Mass': entry[0],
        'Abundance': entry[1]
      })
    });
    avg_mass = numerator / denominator;
    real_isotopes[key] = {
      'Mass': Math.round(avg_mass * 100000) / 100000,
      'Isotopes': iso_data
    }
  }

  fs.writeFile('./ISOTOPES.json', JSON.stringify(real_isotopes, null, 2), function(err){
    if (err) throw err;
  });
});

*/