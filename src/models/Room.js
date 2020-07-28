import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
	messages: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Message',
			required: true
		}
	],
	participants: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		}
	],
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	}
});

export default mongoose.model('Room', roomSchema);
