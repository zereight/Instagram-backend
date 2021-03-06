import mongoose from 'mongoose';
import User from './User';

const commentSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	post: {
		type: mongoose.Types.ObjectId,
		ref: 'Post'
	}
});

export default mongoose.model('Comment', commentSchema);
