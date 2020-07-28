import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	location: {
		type: String
	},
	caption: {
		type: String,
		required: true
	},
	writer: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	attachedFiles: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'File'
		}
	],
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Like'
		}
	],
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

export default mongoose.model('Post', postSchema);
