import User from "../../../models/User";

export default {
    Mutation :{
        createAccount: async (_, args, __) => {
            
            const {
                username,
                firstName,
                lastName,
                bio,
                email
            } = args;
            
            const loginSecret = "1";

            const user = await User.create({
                username,
                firstName,
                lastName,
                bio,
                email,
                loginSecret
            })

            return user;
        }
    }
}