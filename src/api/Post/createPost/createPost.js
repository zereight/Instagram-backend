import Post from "../../../models/Post";

export default {
    Mutation : {
        createPost: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);

            const {
                location,
                caption} = args;
            
            const writer = request.user;

            try {
                const newPost = await Post.create({
                    location,
                    caption,
                    writer,
                    attachedFiles: [],
                    likes: [],
                    comments: []
                });
                return newPost;
            } catch (error) {
                console.log(error);
                throw Error("Create Post Error");
            }
            
        }
    }
}