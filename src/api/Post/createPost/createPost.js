import Post from '../../../models/Post';
import User from '../../../models/User';

export default {
	Mutation: {
		createPost: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { location, caption } = args;

			const writer = request.user;

			try {
				const newPost = await Post.create({
					location,
					caption,
					writer,
					attachedFiles: [],
					likes: [],
					comments: []
				});
				const thatUser = await User.findById({ _id: writer._id }); //.populate("posts");
				thatUser.posts.push(newPost._id);
				thatUser.save();
				return newPost;
			} catch (error) {
				console.log(error);
				throw Error('Create Post Error');
			}
		}
	}
};
