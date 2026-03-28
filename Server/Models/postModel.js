import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    desc: {
      type: String,
      maxLength: 500,
      default: ""
    },

    // ✅ FIXED image field
    image: {
      type: String,
      default: ""
    },

    // ✅ Better likes system
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: []
    }
  },
  {
    timestamps: true
  }
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;