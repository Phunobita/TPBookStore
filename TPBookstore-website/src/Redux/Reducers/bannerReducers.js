import {
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_CREATE_RESET,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_RESET,
  BANNER_DELETE_RESET,
  SLIDER_LIST_REQUEST,
  SLIDER_LIST_SUCCESS,
  SLIDER_LIST_FAIL
} from "./../Constants/bannerConstants.js";

// ALL BANNERS
export const bannerListReducer = (state = { banner: [] }, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return { loading: true, banners: [] };
    case BANNER_LIST_SUCCESS:
      return { loading: false, success: true, banners: action.payload };
    case BANNER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ALL SLIDERS
export const sliderListReducer = (state = { sliders: [] }, action) => {
  switch (action.type) {
    case SLIDER_LIST_REQUEST:
      return { loading: true, sliders: [] };
    case SLIDER_LIST_SUCCESS:
      return { loading: false, success: true, sliders: action.payload };
    case SLIDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE BANNER
export const bannerCreateReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST:
      return { loading: true };
    case BANNER_CREATE_SUCCESS:
      return { loading: false, success: true, bannerName: action.payload };
    case BANNER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// DELETE CATEGORY
export const bannerDeleteReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true };
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CATEGORY
export const bannerUpdateReducerAdmin = (state = { status: "" }, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return { loading: true };
    case BANNER_UPDATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case BANNER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_UPDATE_RESET:
      return { status: "" };
    default:
      return state;
  }
};
