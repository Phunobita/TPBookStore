import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_VERIFY,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_ROLE_REQUEST,
  USER_UPDATE_ROLE_SUCCESS,
  USER_UPDATE_ROLE_FAIL,
  USER_UPDATE_ROLE_RESET,
  USER_GET_ADDRESS_DATA_REQUEST,
  USER_GET_ADDRESS_DATA_SUCCESS,
  USER_GET_ADDRESS_DATA_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
  ADMIN_GET_USER_DETAILS_REQUEST,
  ADMIN_GET_USER_DETAILS_SUCCESS,
  ADMIN_GET_USER_DETAILS_FAIL,
  ADMIN_ADD_STAFF_REQUEST,
  ADMIN_ADD_STAFF_SUCCESS,
  ADMIN_ADD_STAFF_FAIL,
  USER_DISABLE_REQUEST,
  USER_DISABLE_SUCCESS,
  USER_DISABLE_FAIL
} from "../Constants/userConstants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
// REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_VERIFY:
      return { loading: false };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const adminAddStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_STAFF_REQUEST:
      return { loading: true };
    case ADMIN_ADD_STAFF_SUCCESS:
      return { loading: false, success: true, ...action.payload };
    case ADMIN_ADD_STAFF_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// USER DETAIL
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {
        user: {}
      };
    default:
      return state;
  }
};

// ADMIN GET USER DETAIL
export const adminGetUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_GET_USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ADMIN_GET_USER_DETAILS_SUCCESS:
      return { loading: false, ...action.payload };
    case ADMIN_GET_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// USER UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
// USER UPDATE ROLE BY ADMIN
export const userUpdateRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ROLE_REQUEST:
      return { loading: true };
    case USER_UPDATE_ROLE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_ROLE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_ROLE_RESET:
      return {};
    default:
      return state;
  }
};
// Admin disable user
export const userDisableReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DISABLE_REQUEST:
      return { loading: true };
    case USER_DISABLE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_DISABLE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
// USER UPDATE PASSWORD
export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true, userUpdatePassword: action.payload };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_PASSWORD_RESET:
      return {
        userUpdatePassword: {}
      };
    default:
      return state;
  }
};
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, userForgotPassword: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_FORGOT_PASSWORD_RESET:
      return { userForgotPassword: {} };
    default:
      return state;
  }
};
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, userResetPassword: action.payload };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return { userResetPassword: {} };
    default:
      return state;
  }
};

// USER UPDATE AVATAR
export const userUpdateAvatarReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_AVATAR_REQUEST:
      return { loading: true };
    case USER_UPDATE_AVATAR_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_AVATAR_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, ...action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// Get address data
export const userGetAddressDataReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ADDRESS_DATA_REQUEST:
      return { loading: true };
    case USER_GET_ADDRESS_DATA_SUCCESS:
      return { loading: false, addressData: action.payload };
    case USER_GET_ADDRESS_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
