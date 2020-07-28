import User from '../../../models/User';

export default {
	Query: {
		seeUser: (_, args) => {
			const { id } = args;
			return User.findById({ _id: id });
		}
	}
};
