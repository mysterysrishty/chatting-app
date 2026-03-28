import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    firstname: {
      type: String,
      required: true,
      trim: true
    },

    lastname: {
      type: String,
      required: true,
      trim: true
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    // ✅ FIXED (VERY IMPORTANT)
    profilePicture: {
      type: String,
      default: "defaultProfile.png"
    },

    coverPicture: {
      type: String,
      default: "defaultCover.jpg"
    },

    about: {
      type: String,
      default: ""
    },

    livesin: {
      type: String,
      default: ""
    },

    worksAt: {
      type: String,
      default: ""
    },

    country: {
      type: String,
      default: ""
    },

    relationship: {
      type: String,
      enum: ["single", "married", "complicated", ""],
      default: ""
    },

    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: []
    },

    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: []
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;