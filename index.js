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