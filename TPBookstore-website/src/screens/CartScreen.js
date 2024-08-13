import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartListItem, removeFromCartItem, updateCart } from "./../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import formatCash from "../utils/formatCash";
import Modal from "../components/base/modal/Modal";
import { CART_REMOVE_RESET } from "../Redux/Constants/cartConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;
  const [productIdDelete, setProductIdDelete] = useState("");
  // product total handler
  const itemChecked = cartItems?.filter((item) => item.isBuy === true);
  const totalHandler = itemChecked?.reduce((pro, item) => pro + item.qty * item?.product.priceSale, 0); /*.toFixed(2);*/

  const addToCart = useSelector((state) => state.addToCart);
  const { success } = addToCart;

  const removeCart = useSelector((state) => state.removeCart);
  const { success: removeCartSuccess, error: removeCartError } = removeCart;

  const updateCartStore = useSelector((state) => state.cartUpdate);
  const { loading, success: updateCartSuccess, error: updateCartError } = updateCartStore;

  useEffect(() => {
    dispatch(getCartListItem());
    if (removeCartSuccess) {
      toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!", ToastObjects);
      dispatch({ type: CART_REMOVE_RESET });
    }
    if (removeCartError) {
      toast.error(removeCartError, ToastObjects);
    }
  }, [dispatch, success, removeCartSuccess, removeCartError, updateCartSuccess]);

  // checkout handler
  const checkOutHandler = () => {
    history.push("/shipping");
  };

  // checkbox handler  all items from the cart
  const checkboxAllHandler = (e) => {
    const listItemCheckbox = document.getElementsByName("checkboxBuy");
    for (let i = 0; i < listItemCheckbox.length; i++) {
      if (listItemCheckbox[i].type === "checkbox" && !listItemCheckbox[i].disabled) {
        if (!listItemCheckbox[i].checked === e) listItemCheckbox[i].click();
      }
    }
  };

  // handler remove the product from the cart
  const removeFromCartHandler = () => {
    dispatch(removeFromCartItem([productIdDelete]));
  };

  //handler updates the product from the cart
  const updateFromCartHandler = (productId, qty, isBuy) => {
    dispatch(updateCart(productId, qty, isBuy));
    if (updateCartError) {
      toast.error(updateCartError, ToastObjects);
    }
  };

  return (
    <>
      <Toast />
      <Modal
        modalTitle={"Xóa sản phẩm khỏi giỏ hàng"}
        modalBody={"Bạn có chắc muốn xóa Sản phẩm này khỏi giỏ hàng?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={removeFromCartHandler}
      />
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems?.length === 0 || !cartItems ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng của bạn còn trống{" "}
            <Link
              className="btn btn--primary-color mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "17px"
              }}
            >
              MUA NGAY
            </Link>
          </div>
        ) : (
          <>
            {/* PC */}

            <div className="cart-title row">
              <div className="cart-title-item col-lg-6">Sản phẩm</div>
              <div className="cart-title-item col-lg-2">Đơn giá</div>
              <div className="cart-title-item col-lg-1">Số lượng</div>
              <div className="cart-title-item col-lg-2">Thành tiền</div>
              <div className="cart-title-item col-lg-1">Thao tác</div>
            </div>
            {/* cartitem */}
            {cartItems?.map((item) => (
              <div className="cart-item" key={item.product._id}>
                {/* ------------ PC -------------- */}
                {/* checkbox */}
                <div className="cart-itemPC row">
                  <div className="cart-itemPC-checkbox col-lg-1">
                    <input
                      className="cart-itemPC-checkbox-input"
                      type="checkbox"
                      name="checkboxBuy"
                      id={item.product._id}
                      checked={item.isBuy}
                      hidden={item.product?.countInStock <= 0 || item.product.isDisabled}
                      disabled={item.product?.countInStock <= 0 || item.product.isDisabled}
                      onChange={(e) => {
                        updateFromCartHandler(item.product._id, item.qty, e.target.checked);
                      }}
                    />
                  </div>
                  {/* Image */}
                  <div
                    className={
                      item.product.isDisabled
                        ? `cart-itemPC-image col-lg-2 status-disabled`
                        : `cart-itemPC-image col-lg-2`
                    }
                  >
                    <Link to={`/product/${item.product.slug}`}>
                      <img src={item.product.image} alt={item.product.name} />
                    </Link>
                  </div>
                  {/* Name */}
                  <div
                    className={
                      item.product.isDisabled
                        ? `cart-itemPC-text col-lg-3 col-md-5 status-disabled`
                        : `cart-itemPC-text col-lg-3`
                    }
                  >
                    <Link to={`/product/${item.product.slug}`}>
                      <p>{item.product.name}</p>
                    </Link>
                  </div>
                  {/* Price */}
                  <div
                    className={
                      item.product.isDisabled
                        ? `cart-itemPC-price col-lg-2 status-disabled`
                        : `cart-itemPC-price col-lg-2`
                    }
                  >
                    <b>{formatCash(item.product.priceSale)}</b>
                  </div>
                  {/* Quantity */}
                  <div className="cart-itemPC-qty col-lg-1">
                    {item.product.countInStock > 0 && !item.product.isDisabled ? (
                      <select
                        value={item.qty}
                        onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value), item.isBuy)}
                      >
                        {[...Array(item.product.countInStock).keys()].map((x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    ) : item.product.isDisabled ? (
                      <div className="cart-item-qty-alert text-center text-danger fw-bold">Sản phẩm đã ngừng bán</div>
                    ) : (
                      <div className="cart-item-qty-alert text-danger fw-bold">Hết hàng</div>
                    )}
                  </div>
                  {/* Total a product */}
                  <div
                    className={
                      item.product.isDisabled
                        ? `cart-itemPC-total col-lg-2 status-disabled`
                        : `cart-itemPC-total col-lg-2`
                    }
                  >
                    <b>{formatCash(item.product.priceSale * item.qty)}</b>
                  </div>
                  {/* Remove product */}
                  <div className="col-lg-1 cart-itemPC-remove ">
                    <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
                      <i class="fas fa-trash-alt text-danger" onClick={() => setProductIdDelete(item.product._id)}></i>
                    </Link>
                  </div>
                </div>

                {/* -------------TABLET AND MOBILE --------------------- */}
                <div className="cart-itemMobile row">
                  <div className="row col-md-5 col-5">
                    {/* checkbox */}
                    <div className="cart-itemMobile-checkbox col-md-4 col-3">
                      <input
                        className="cart-itemMobile-checkbox-input"
                        type="checkbox"
                        name="checkboxBuy"
                        id={item.product._id}
                        checked={item.isBuy}
                        hidden={item.product?.countInStock <= 0 || item.product.isDisabled}
                        disabled={item.product?.countInStock <= 0 || item.product.isDisabled}
                        onChange={(e) => updateFromCartHandler(item.product._id, item.qty, e.target.checked)}
                      />
                    </div>
                    {/* Image */}
                    <div className="cart-itemMobile-image col-md-8 col-9">
                      <Link to={`/product/${item.product.slug}`}>
                        <img src={item.product.image} alt={item.product.name} />
                      </Link>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="row col-md-7 col-7">
                    <div className="cart-itemMobile-text col-md-12 col-12">
                      <Link to={`/product/${item.product.slug}`}>
                        <p>{item.product.name}</p>
                      </Link>
                    </div>
                    {/* Price */}
                    <div className="cart-itemMobile-price col-md-4 col-7">
                      <b>{formatCash(item.product.priceSale)}</b>
                    </div>
                    {/* Quantity */}
                    <div className="cart-itemMobile-qty col-md-4 col-5">
                      {item.product.countInStock > 0 && !item.product.isDisabled ? (
                        <select
                          value={item.qty}
                          onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value), item.isBuy)}
                        >
                          {[...Array(item.product.countInStock).keys()].map((x, index) => (
                            <option key={index} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      ) : item.product.isDisabled ? (
                        <div className="cart-item-qty-alert text-danger fw-bold">Sản phẩm không còn tồn tại</div>
                      ) : (
                        <div className="cart-item-qty-alert text-danger fw-bold">Hết hàng</div>
                      )}
                    </div>
                    {/* Total a product */}
                    {/* <div className="cart-itemMobile-total col-lg-2 col-md-2 col-sm-7">
                      <b>{formatCash(item.product.price * item.qty)}</b>
                    </div> */}
                    {/* Remove product */}
                    <div className="col-md-12 col-12 mt-3 cart-itemMobile-remove">
                      <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
                        <i
                          class="fas fa-trash-alt text-danger"
                          onClick={() => setProductIdDelete(item.product._id)}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total row ">
              <div className="total-checkbox col-lg-1 col-md-2 col-3">
                <input
                  className="total-checkbox-check"
                  type="checkbox"
                  onChange={(e) => checkboxAllHandler(e.target.checked)}
                />
                <span>Tất cả</span>
              </div>
              <div className="col-lg-9 col-md-7 col-6">
                <span className="total__text">
                  Tổng thanh toán
                  <span className="total__qty">({itemChecked?.length} sản phẩm)</span> :
                </span>
                <span className="total__price">{formatCash(totalHandler)}</span>
              </div>
              <div className="cart-buttons col-lg-2 col-md-3 col-3 justify-content-md-end">
                <button onClick={checkOutHandler} disabled={!itemChecked?.length > 0}>
                  <b>Mua hàng</b>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
