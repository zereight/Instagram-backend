import Post from '../../../models/Post';
import File from '../../../models/File';
import User from '../../../models/User';

export default {
	Mutation: {
		upload: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			console.log(_);
			const { caption, files } = args;
			const { user } = request;
			try {
				const newPost = await Post.create({
					caption,
					writer: user._id
				});

				let newFiles = [];

				await Promise.all(
					files.map(async (file) => {
						const newFile = await File.create({
							url: file,
							post: newPost._id
						});
						newFiles.push(newFile);
					})
				);
				newPost.attachedFiles = newFiles;
				await newPost.depopulate('attachedFiles');
				await newPost.save();

				const me = await User.findById({ _id: user._id });
				me.posts.push(newPost._id);

				await me.save();

				return newPost;
			} catch (error) {
				console.log(error);
				throw Error('upload Error!');
			}
		}
	}
};
