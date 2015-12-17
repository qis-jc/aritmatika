var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var HighScoreSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	playtime: {
		type: String,
		required: true
	},
	classSelection:{
		type: Number,
		required: true
	},
	level:{
		type: Number,
		required: true
	},
	score:{
		type:Number,
		required: true
	}
});

module.exports = mongoose.model('HighScore', HighScoreSchema);