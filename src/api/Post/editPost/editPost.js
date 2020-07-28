import Post from '../../../models/Post';
import Like from '../../../models/Like';
import File from '../../../models/File';
import Comment from '../../../models/Comment';
import User from '../../../models/User';

export default {
	Mutation: {
		editPost: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { postId, caption, location, action } = args;

			try {
				if (action === 'EDIT') {
					return Post.findByIdAndUpdate(
						{ _id: postId },
						{
							caption,
							location
						}
					);
				} else if (action === 'DELETE') {
					let { user } = request;
					user = await User.findById({ _id: user._id }).populate('likes').populate('comments');

					let idx = await user.posts.indexOf(postId);
					await user.posts.splice(idx, 1);

					idx = await user.likes.findIndex((like) => like.post === postId);
					await user.likes.splice(idx, 1);

					idx = await user.comments.findIndex((comment) => comment.post === postId);
					await user.comments.splice(idx, 1);

					await user.save();

					await Like.findOneAndDelete({ post: postId });
					await Comment.findOneAndDelete({ post: postId });
					await File.deleteMany({ post: postId });

					return Post.findByIdAndDelete({ _id: postId });
				} else {
					throw Error('editPost action Error!');
				}
			} catch (error) {
				console.log(error);
				throw Error('editPost Error!');
			}
		}
	}
};
