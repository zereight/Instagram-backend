import Like from "../../../models/Like";
import Post from "../../../models/Post";

export default {
    Mutation: {
        toggleLike: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;

            try {
                const existingLike = await Like.findOne({user, post:postId});
                const thatPost = await Post.findById({_id: postId}).populate("likes");
                if(existingLike){
                    await Like.findByIdAndDelete({_id: existingLike.id});
                    const idx = thatPost.likes.indexOf(postId);
                    thatPost.likes = thatPost.likes.splice(idx,1);
                }else{
                    const newLike = await Like.create({user, post:postId});
                    await thatPost.likes.push(newLike._id);

                }
                thatPost.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}