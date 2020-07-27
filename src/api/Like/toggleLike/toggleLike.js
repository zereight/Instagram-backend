import Like from "../../../models/Like";
import Post from "../../../models/Post";
import User from "../../../models/User";

export default {
    Mutation: {
        toggleLike: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;

            try {
                const existingLike = await Like.findOne({user, post:postId});
                const thatPost = await Post.findById({_id: postId}).populate("likes");
                const thatUser = await User.findById({_id: user.id}).populate("likes");
                if(existingLike){ // 좋아요가 이미 존재
                    let idx = thatPost.likes.indexOf(existingLike._id);
                    thatPost.likes = thatPost.likes.splice(idx,1);
                    idx = thatUser.likes.indexOf(existingLike._id);
                    thatUser.likes = thatUser.likes.splice(idx,1);

                    await Like.findByIdAndDelete({_id: existingLike.id});
                }else{ // 해당유저의 좋아요가 없음
                    const newLike = await Like.create({user, post:postId});
                    await thatPost.likes.push(newLike._id);
                    await thatUser.likes.push(newLike._id);

                }
                thatPost.save();
                thatUser.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}