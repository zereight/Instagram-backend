import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	from: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	to: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	room: {
		type: mongoose.Types.ObjectId,
		ref: 'Room'
	},
	createAt: {
		type: Date,
		default: Date.now()
	}
});

export default mongoose.model('Message', messageSchema);
