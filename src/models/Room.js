import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }
});

export default mongoose.model("Room", roomSchema);