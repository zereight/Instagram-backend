import Post from '../../../models/Post';

export default {
	Query: {
		searchPost: async (_, args) => {
			const { keyword } = args;
			return Post.find({
				$or: [
					{
						caption: {
							$regex: keyword,
							$options: 'i'
						}
					},
					{
						location: {
							$regex: keyword,
							$options: 'i'
						}
					}
				]
			});
		}
	}
};
