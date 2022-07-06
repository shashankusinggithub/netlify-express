const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
	name: { type: String, required: true },
	userID: { type: String, default: '' },	
	playlist:{ type: [Object], default : []},
	private:{type: Boolean, default :true}
	
});

const Playlist = mongoose.model("playlist", playlistSchema);

module.exports = { Playlist };