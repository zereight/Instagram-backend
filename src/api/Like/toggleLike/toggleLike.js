import Like from "../../../models/Like";

export default {
    Mutation: {
        toggleLike: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;

            try {
                const existingLike = await Like.findOne({user, post:postId});
                if(existingLike){
                    await Like.findByIdAndDelete({id: existingLike.id});
                }else{
                    await (await Like.create({user, post:postId}));
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}