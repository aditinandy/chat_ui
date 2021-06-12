const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
	msg: {
		type: String,
		require: true
	}
})

module.exports = mongoose.model('crud_Chat', crudSchema);