import User from '../../../models/User';

export default {
	Query: {
		searchUser: async (_, args) => {
			const { keyword } = args;

			return await User.find({
				$or: [
					{
						username: {
							$regex: keyword,
							$options: 'i'
						}
					},
					{
						firstName: {
							$regex: keyword,
							$options: 'i'
						}
					},
					{
						lastName: {
							$regex: keyword,
							$options: 'i'
						}
					}
				]
			});
		}
	}
};
