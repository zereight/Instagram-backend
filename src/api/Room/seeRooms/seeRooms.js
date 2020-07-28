import Room from '../../../models/Room';
import User from '../../../models/User';

export default {
	Query: {
		seeRooms: (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { user } = request;

			return User.findById({ _id: user._id }).popuate('rooms');
		}
	}
};
