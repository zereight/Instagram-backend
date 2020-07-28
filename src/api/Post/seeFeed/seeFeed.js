import User from '../../../models/User';
import Post from '../../../models/Post';

export default {
	Query: {
		seeFeed: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { user } = request;
			const following = (await User.findById({ _id: user._id })).following;
			const posts = await Post.find({
				writer: {
					$in: following
				}
			});
			posts.sort((post1, post2) => {
				return post2.createAt.getTime() - post1.createAt.getTime();
			});
			return posts;
		}
	}
};
