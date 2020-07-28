import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	bio: {
		type: String,
		default: ''
	},
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	follower: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Like'
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	rooms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room'
		}
	],
	loginSecret: {
		type: String
	}
});

export default mongoose.model('User', userSchema);
