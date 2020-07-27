import User from "../../../models/User";
import { generateSecret } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args, __) => {
            const {email} = args;
            const loginSecret = generateSecret();
            try{
                await User.findOneAndUpdate({email}, {loginSecret});
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
            

        }
    }
}