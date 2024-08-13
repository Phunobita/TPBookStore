import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_ADMIN_CANCEL_REQUEST,
  ORDER_ADMIN_CANCEL_SUCCESS,
  ORDER_ADMIN_CANCEL_FAIL,
  ORDER_USER_CANCEL_REQUEST,
  ORDER_USER_CANCEL_SUCCESS,
  ORDER_USER_CANCEL_FAIL,
  ORDER_HIDDEN_FAIL,
  ORDER_HIDDEN_REQUEST,
  ORDER_HIDDEN_SUCCESS,
  ORDER_SHOW_REQUEST,
  ORDER_SHOW_SUCCESS,
  ORDER_SHOW_FAIL,
  ORDER_LIST_SHIPPER_REQUEST,
  ORDER_LIST_SHIPPER_SUCCESS,
  ORDER_LIST_SHIPPER_FAIL,
  ORDER_SELECT_SHIPPER_REQUEST,
  ORDER_SELECT_SHIPPER_SUCCESS,
  ORDER_SELECT_SHIPPER_FAIL
} from "../Constants/orderConstants";
import { logout } from "./userActions";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/cartConstants";

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/v1/order`, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/v1/order/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    });
  }
};

// LIST MY ORDERS
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/v1/order/ordered/${userInfo._id}`, config);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message
    });
  }
};

/**
 * Admin
 */
export const listOrders =
  (keyword = "", status = "", limit = 20, pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `/api/v1/order?&keyword=${keyword}&status=${status}&limit=${limit}&page=${pageNumber}`,
        config
      );

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message
      });
    }
  };

// ORDER DETAILS
export const getOrderDetailsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/v1/order/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    });
  }
};
/**
 * GET ORDER LIST BY SHIPPER
 */
export const listOrdersByShipper =
  (status = "", limit = 20, pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_SHIPPER_REQUEST });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `/api/v1/order/shipper/listOrder?&status=${status}&limit=${limit}&page=${pageNumber}`,
        config
      );

      dispatch({ type: ORDER_LIST_SHIPPER_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_SHIPPER_FAIL,
        payload: message
      });
    }
  };

// ORDER DELIVER
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/v1/order/${orderId}/delivered`, {}, config);
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message
    });
  }
};

// Confirm order
export const confirmOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CONFIRM_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/v1/order/${orderId}/confirm`, {}, config);
    dispatch({ type: ORDER_CONFIRM_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CONFIRM_FAIL,
      payload: message
    });
  }
};
// Select shipper
export const selectShipper = (orderId, shipper, estimatedDeliveryDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SELECT_SHIPPER_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.patch(
      `/api/v1/order/${orderId}/selectShipper`,
      { shipper, estimatedDeliveryDate },
      config
    );
    dispatch({ type: ORDER_SELECT_SHIPPER_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_SELECT_SHIPPER_FAIL,
      payload: message
    });
  }
};
// Admin cancel order
export const cancelOrderAdmin = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ADMIN_CANCEL_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/v1/order/${orderId}/cancel-admin`, {}, config);
    dispatch({ type: ORDER_ADMIN_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_ADMIN_CANCEL_FAIL,
      payload: message
    });
  }
};

// User cancel order
export const cancelOrderUser = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_USER_CANCEL_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/v1/order/${orderId}/cancel-user`, {}, config);
    dispatch({ type: ORDER_USER_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_USER_CANCEL_FAIL,
      payload: message
    });
  }
};

// ORDER ORDER IS PAID
export const isPaidOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.patch(`/api/v1/order/${orderId}/payment`, {}, config);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    });
  }
};
// DELETE ORDER
export const deleteOrderAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/v1/order/${id}`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message
    });
  }
};

// HIDDEN ORDER
export const hiddenOrderAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_HIDDEN_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.patch(`/api/v1/order/${id}/disable`, {}, config);

    dispatch({ type: ORDER_HIDDEN_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_HIDDEN_FAIL,
      payload: message
    });
  }
};

// SHOW ORDER
export const showOrderAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SHOW_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.patch(`/api/v1/order/${id}/restore`, {}, config);

    dispatch({ type: ORDER_SHOW_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_SHOW_FAIL,
      payload: message
    });
  }
};
