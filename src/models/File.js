import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    }
});

export default mongoose.model("File", fileSchema);