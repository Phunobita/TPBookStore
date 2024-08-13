import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_CONFIRM_RESET,
  ORDER_ADMIN_CANCEL_REQUEST,
  ORDER_ADMIN_CANCEL_SUCCESS,
  ORDER_ADMIN_CANCEL_FAIL,
  ORDER_ADMIN_CANCEL_RESET,
  ORDER_USER_CANCEL_REQUEST,
  ORDER_USER_CANCEL_SUCCESS,
  ORDER_USER_CANCEL_FAIL,
  ORDER_USER_CANCEL_RESET,
  ORDER_HIDDEN_REQUEST,
  ORDER_HIDDEN_SUCCESS,
  ORDER_HIDDEN_FAIL,
  ORDER_HIDDEN_RESET,
  ORDER_SHOW_REQUEST,
  ORDER_SHOW_SUCCESS,
  ORDER_SHOW_FAIL,
  ORDER_SHOW_RESET,
  ORDER_LIST_SHIPPER_REQUEST,
  ORDER_LIST_SHIPPER_SUCCESS,
  ORDER_LIST_SHIPPER_FAIL,
  ORDER_SELECT_SHIPPER_REQUEST,
  ORDER_SELECT_SHIPPER_SUCCESS,
  ORDER_SELECT_SHIPPER_FAIL,
  ORDER_SELECT_SHIPPER_RESET
} from "../Constants/orderConstants";

/**
 * Client front-end
 */
// CREATE ORDER
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER PAY
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// USER ORDERS
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

/**
 * Admin front-end
 */
// LIST ORDER
export const orderListReducerAdmin = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, ...action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// LIST ORDER BY SHIPPER
export const orderListByShipperReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_SHIPPER_REQUEST:
      return { loading: true };
    case ORDER_LIST_SHIPPER_SUCCESS:
      return { loading: false, ...action.payload };
    case ORDER_LIST_SHIPPER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// ORDER DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

//CONFIRM ORDER
export const orderConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRM_REQUEST:
      return { loading: true };
    case ORDER_CONFIRM_SUCCESS:
      return { loading: false, success: true };
    case ORDER_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};
// SELECT SHIPPER
export const orderSelectShipperReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SELECT_SHIPPER_REQUEST:
      return { loading: true };
    case ORDER_SELECT_SHIPPER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_SELECT_SHIPPER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_SELECT_SHIPPER_RESET:
      return {};
    default:
      return state;
  }
};

//ADMIN CANCEL ORDER
export const orderCancelAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_CANCEL_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case ORDER_ADMIN_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_CANCEL_RESET:
      return {};
    default:
      return state;
  }
};

//USER CANCEL ORDER
export const orderCancelUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_USER_CANCEL_REQUEST:
      return { loading: true };
    case ORDER_USER_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case ORDER_USER_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_USER_CANCEL_RESET:
      return {};
    default:
      return state;
  }
};

// ORDER PAY
export const orderIsPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE ORDER
export const orderDeleteReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// HIDDEN ORDER
export const orderHiddenReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case ORDER_HIDDEN_REQUEST:
      return { loading: true };
    case ORDER_HIDDEN_SUCCESS:
      return { loading: false, success: true };
    case ORDER_HIDDEN_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_HIDDEN_RESET:
      return {};
    default:
      return state;
  }
};

// SHOW ORDER
export const orderShowReducerAdmin = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SHOW_REQUEST:
      return { loading: true };
    case ORDER_SHOW_SUCCESS:
      return { loading: false, success: true };
    case ORDER_SHOW_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_SHOW_RESET:
      return {};
    default:
      return state;
  }
};
