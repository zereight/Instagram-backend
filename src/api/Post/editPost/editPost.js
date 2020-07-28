import Post from '../../../models/Post';

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
