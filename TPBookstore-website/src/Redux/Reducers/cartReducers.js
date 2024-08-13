import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESET,
  ADD_TO_CART_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_LIST_MY_FAIL,
  CART_LIST_MY_REQUEST,
  CART_LIST_MY_SUCCESS,
  // CART_ADD_ITEM,
  CART_REMOVE_RESET,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_RESET
} from "./../Constants/cartConstants";

// CART LIST ITEM
export const cartListItemReducers = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case CART_LIST_MY_SUCCESS:
      return { loading: false, cartUser: action.payload };
    case CART_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADD TO CART
export const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };
    case ADD_TO_CART_SUCCESS:
      return { loading: false, success: true, cartItems: action.payload };
    case ADD_TO_CART_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TO_CART_RESET:
      return {};
    default:
      return state;
  }
};

// REMOVE CART
export const cartRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_REQUEST:
      return { loading: true };
    case CART_REMOVE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CART_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case CART_REMOVE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE CART
export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return { loading: true };
    case CART_UPDATE_SUCCESS:
      return { loading: false, success: true, cartItems: action.payload };
    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CART_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
