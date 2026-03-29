import * as PostApi from "../api/PostRequest";

// 📥 Get Timeline Posts
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_START" });

  try {
    const { data } = await PostApi.getTimelinePosts(id);

    dispatch({
      type: "RETRIEVING_SUCCESS",
      data: data,
    });

    return data; // ✅ useful for debugging
  } catch (error) {
    console.error(
      "Fetch posts error:",
      error?.response?.data || error.message
    );

    dispatch({
      type: "RETRIEVING_FAIL",
      error: error?.response?.data || "Failed to fetch posts",
    });

    throw error; // ✅ important
  }
};