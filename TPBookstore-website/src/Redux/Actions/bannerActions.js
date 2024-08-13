import axios from "axios";
import {
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  SLIDER_LIST_REQUEST,
  SLIDER_LIST_SUCCESS,
  SLIDER_LIST_FAIL
} from "../Constants/bannerConstants.js";
import { logout } from "./userActions.js";

// LIST ALL BANNER
export const listBanner = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/banner?role=banner`);

    dispatch({ type: BANNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: BANNER_LIST_FAIL,
      payload: message
    });
  }
};

// LIST ALL SLIDER
export const listSlider = () => async (dispatch) => {
  try {
    dispatch({ type: SLIDER_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/banner?role=slider`);

    dispatch({ type: SLIDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: SLIDER_LIST_FAIL,
      payload: message
    });
  }
};

// CREATE BANNER
export const createBannerAdmin = (banner) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_CREATE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/v1/banner/`, banner, config);

    dispatch({ type: BANNER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BANNER_CREATE_FAIL,
      payload: message
    });
  }
};

// DELETE BANNER
export const deleteBannerAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/v1/banner/${id}`, config);

    dispatch({ type: BANNER_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BANNER_DELETE_FAIL,
      payload: message
    });
  }
};

// UPDATE BANNER
export const updateBannerAdmin = (bannerId, banner) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/v1/banner/${bannerId}`, banner, config);

    dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BANNER_UPDATE_FAIL,
      payload: message
    });
  }
};
