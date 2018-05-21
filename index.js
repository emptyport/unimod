var unimod_definitions = require('./unimod.json');
var name_id_index = require('./name_id_index.json');

module.exports.getByName = function(name) {
  name = name.toLowerCase();
  if (!(name in unimod_definitions)) return {};
  return unimod_definitions[name];
}

module.exports.getById = function(id) {
  if (!(id in name_id_index)) return {};
  return unimod_definitions[name_id_index[id]];
}

module.exports.listMods = function() {
  var names = [];
  for (var id in name_id_index) {
    if (name_id_index.hasOwnProperty(id)) {
      names.push(name_id_index[id]);
    }
  }
  return names;
}