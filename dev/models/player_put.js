var pg     = require('pg');
var Schema       = pg.Schema;

var PlayerSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Bear', BearSchema);