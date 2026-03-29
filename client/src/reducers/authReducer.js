const initialState = {
  authData: JSON.parse(localStorage.getItem("profile")), // ✅ FIX
  loading: false,
  error: false,
  updateLoadng: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        loading: false,   // ✅ important
        error: false,
      };

    case "AUTH_FAIL":
      return {
        ...state,
        loading: false,   // ✅ important
        error: true,
      };

    case "UPDATING_START":
      return {
        ...state,
        updateLoadng: true,
        error: false,
      };

    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        updateLoadng: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return {
        ...state,
        updateLoadng: false,
        error: true,
      };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following,
              action.data,
            ],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: state.authData.user.following.filter(
              (id) => id !== action.data
            ),
          },
        },
      };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;