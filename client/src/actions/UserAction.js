import * as UserApi from "../api/UserRequest";

// ✏️ Update User
export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });

  try {
    const { data } = await UserApi.updateUser(id, formData);

    dispatch({
      type: "UPDATING_SUCCESS",
      data: data,
    });

    return data; // ✅ useful
  } catch (error) {
    console.error("Update user error:", error);

    dispatch({ type: "UPDATING_FAIL" });

    throw error; // ✅ important
  }
};

// ➕ Follow User
export const followUser = (id, data) => async (dispatch) => {
  // optimistic update
  dispatch({ type: "FOLLOW_USER", data: id });

  try {
    await UserApi.followUser(id, data);
  } catch (error) {
    console.error("Follow error:", error);

    // rollback if failed
    dispatch({ type: "UNFOLLOW_USER", data: id });

    throw error;
  }
};

// ➖ Unfollow User
export const unFollowUser = (id, data) => async (dispatch) => {
  // optimistic update
  dispatch({ type: "UNFOLLOW_USER", data: id });

  try {
    await UserApi.unFollowUser(id, data);
  } catch (error) {
    console.error("Unfollow error:", error);

    // rollback if failed
    dispatch({ type: "FOLLOW_USER", data: id });

    throw error;
  }
};