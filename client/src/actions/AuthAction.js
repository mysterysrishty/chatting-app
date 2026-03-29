import * as AuthApi from "../api/AuthRequest.js";

// 🔐 LOGIN
export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });

  try {
    const { data } = await AuthApi.logIn(formData);

    dispatch({
      type: "AUTH_SUCCESS",
      data: data,
    });

    return data; // ✅ important
  } catch (error) {
    console.error("Login error:", error?.response?.data || error.message);

    dispatch({
      type: "AUTH_FAIL",
      error: error?.response?.data || "Login failed",
    });

    throw error; // ✅ important
  }
};

// 📝 SIGN UP
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });

  try {
    const { data } = await AuthApi.signUp(formData);

    dispatch({
      type: "AUTH_SUCCESS",
      data: data,
    });

    return data;
  } catch (error) {
    console.error("Signup error:", error?.response?.data || error.message);

    dispatch({
      type: "AUTH_FAIL",
      error: error?.response?.data || "Signup failed",
    });

    throw error;
  }
};

// 🚪 LOGOUT
export const logOut = () => async (dispatch) => {
  try {
    // optional cleanup
    localStorage.removeItem("profile"); // ✅ if you store user

    dispatch({ type: "LOG_OUT" });
  } catch (error) {
    console.error("Logout error:", error);
  }
};