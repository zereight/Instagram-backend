import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	post: {
		type: mongoose.Types.ObjectId,
		ref: 'Post'
	}
});

export default mongoose.model('Like', likeSchema);
