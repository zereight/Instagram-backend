import User from '../../../models/User';
import jwt from 'jsonwebtoken';
export default {
	Mutation: {
		confirmSecret: async (_, args) => {
			const { email, secret } = args;
			const user = await User.findOne({ email });
			if (user.loginSecret === secret) {
				await User.findByIdAndUpdate({ _id: user._id }, { loginSecret: '' });
				return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
			} else {
				throw Error('Wrong Email Authentication');
			}
		}
	}
};
