import * as UploadApi from "../api/UploadRequest";

// 📸 Upload Image (Cloudinary)
export const uploadImage = (image) => async (dispatch) => {
  try {
    const res = await UploadApi.uploadImage(image);

    // ✅ return only URL (clean)
    return res.data.url;

  } catch (error) {
    console.error("❌ Image upload error:", error?.response?.data || error.message);

    // optional dispatch
    // dispatch({ type: "UPLOAD_IMAGE_FAIL" });

    throw error;
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

    return res.data;

  } catch (error) {
    console.error("❌ Post upload error:", error?.response?.data || error.message);

    dispatch({ type: "UPLOAD_FAIL" });

    throw error;
  }
};