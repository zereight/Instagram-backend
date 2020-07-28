import User from '../../../models/User';
import Post from '../../../models/Post';

export default {
	Query: {
		me: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { user } = request;
			const userProfile = await User.findById({ _id: user.id }).populate('posts');
			console.log(userProfile);
			const posts = userProfile.posts;
			console.log(posts);
			return {
				user: userProfile,
				posts
			};
		}
	}
};
