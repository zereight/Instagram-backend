import User from '../../../models/User';

export default {
	Mutation: {
		toggleFollow: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { userId } = args;
			const { user } = request;

			try {
				const opponent = await User.findById({ _id: userId }); // populate하면 id가 아니라 값까지 다 채워지므로 주의
				const me = await User.findById({ _id: user.id });

				// console.log(opponent.follower);
				// console.log(me.following);
				const follower_idx = await opponent.follower.indexOf(me._id);
				const followeing_idx = await me.following.indexOf(opponent._id);
				// console.log(follower_idx, followeing_idx);
				if (follower_idx !== -1 && followeing_idx !== -1) {
					// 이미 관계가 형성되어 있으면
					await opponent.follower.splice(follower_idx, 1);
					await me.following.splice(followeing_idx, 1);
				} else if (follower_idx === -1 && followeing_idx === -1) {
					await opponent.follower.push(me._id);
					await me.following.push(opponent._id);
				} else {
					throw Error('follower, following relation error');
				}

				opponent.save();
				me.save();

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		}
	}
};
