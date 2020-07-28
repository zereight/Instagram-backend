import Post from '../../../models/Post';

export default {
	Query: {
		seeFullPost: async (_, args) => {
			const { id: postId } = args;

			try {
				const post = await Post.findById({ _id: postId });
				const comments = (await Post.findById({ _id: postId }).populate('comments')).comments;
				const likeCount = post.likes.length;
				// console.log(post);
				// console.log(comments);
				// console.log(likeCount);
				return {
					post,
					comments,
					likeCount
				};
			} catch (error) {
				console.log(error);
				throw Error('seeFullPost error');
			}
		}
	}
};
