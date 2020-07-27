import Comment from '../../../models/Comment';
import Post from '../../../models/Post';
import User from '../../../models/User';

export default {
	Mutation: {
		addComment: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { text, postId } = args;
			const { user } = request;
			try {
				const newComment = await Comment.create({
					text,
					user,
					post: postId
				});
				const thatPost = await Post.findById({ _id: postId }); //.populate("comments");
				await thatPost.comments.push(newComment._id);
				const thatUser = await User.findById({ _id: user.id }); //.populate("comments");
				await thatUser.comments.push(newComment._id);

				thatPost.save();
				thatUser.save();

				return newComment;
			} catch (error) {
				console.log(error);
				throw Error('addComment Error');
			}
		}
	}
};
