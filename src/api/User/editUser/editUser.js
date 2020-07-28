import User from '../../../models/User';

export default {
	Mutation: {
		editUser: (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { user } = request;
			const { username, email, firstName, lastName, bio } = args;

			try {
				return User.findByIdAndUpdate(
					{ _id: user.id },
					{
						username,
						email,
						firstName,
						lastName,
						bio
					}
				);
			} catch (error) {
				console.log(error);
				throw Error('editUser error!');
			}
		}
	}
};
