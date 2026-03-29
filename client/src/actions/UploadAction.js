import * as UploadApi from "../api/UploadRequest";

// 📸 Upload Image
export const uploadImage = (data) => async (dispatch) => {
  try {
    const res = await UploadApi.uploadImage(data);

    // optional: you can dispatch if needed later
    // dispatch({ type: "UPLOAD_IMAGE_SUCCESS", data: res.data });

    return res.data; // ✅ return for chaining
  } catch (error) {
    console.error("Image upload error:", error);

    // optional: dispatch error
    // dispatch({ type: "UPLOAD_IMAGE_FAIL" });

    throw error; // ✅ important
  }
};

// 📝 Upload Post
export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });

  try {
    const res = await UploadApi.uploadPost(data);

    dispatch({
      type: "UPLOAD_SUCCESS",
      data: res.data,
    });

    return res.data; // ✅ return for chaining
  } catch (error) {
    console.error("Post upload error:", error);

    dispatch({ type: "UPLOAD_FAIL" });

    throw error; // ✅ important
  }
};