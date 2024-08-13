import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderUser, getOrderDetails } from "../Redux/Actions/orderActions";
import moment from "moment";
import Loading from "../components/base/LoadingError/Loading";
import Message from "../components/base/LoadingError/Error";
import formatCash from "../utils/formatCash";
import Modal from "../components/base/modal/Modal";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderCancel = useSelector((state) => state.orderCancelUser);
  const { loading: loadingCancel, success: successCancel } = orderCancel;

  if (!loading) {
    order.itemsPrice = order?.orderItems?.reduce((accumulate, item) => accumulate + item.price * item.qty, 0);
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successCancel]);
  const cancelHandler = () => {
    dispatch(cancelOrderUser(order._id));
  };
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <Modal
              modalTitle={"Hủy đơn hàng"}
              modalBody={"Bạn có chắc muốn hủy đơn hàng này?"}
              btnTitle={"Xác nhận hủy đơn"}
              btnType={"delete"}
              handler={cancelHandler}
            />
            <header className="card-header mt-2 p-3 Header-green" style={{ marginLeft: "-12px", marginRight: "-12px" }}>
              <div className="row align-items-center ">
                <div className="col-lg-6 col-md-8">
                  <i class="far fa-barcode-alt"></i>
                  <b className="text-white mx-1">Mã đơn hàng:</b>
                  <span className="text-white mx-1">{order._id}</span>
                  <br />
                  <span>
                    <i className="far fa-calendar-alt"></i>
                    <b className="text-white"> Ngày đặt:</b>
                    <span className="text-white mx-3 ">
                      {moment(order.createdAt).format("LT") + " " + moment(order.createdAt).format("L")}
                    </span>
                  </span>
                </div>
                <div className="col-lg-6 col-md-4 ms-auto d-flex justify-content-end align-items-center">
                  <Link className="btn btn-success ms-2">
                    <i className="fas fa-print"></i>
                  </Link>
                </div>
              </div>
            </header>
            <div className="row order-detail">
              {/*  */}
              <div className="order-detail-item col-lg-3 col-md-6 col-6">
                <div className="row order-detail-item-content">
                  <div className="col-md-3 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-9 center">
                    <h7 className="order-detail-title">
                      <strong>Người nhận</strong>
                    </h7>
                    <p className="order-detail-text">Tên: {order.receiver}</p>
                    <p className="order-detail-text">SĐT: {order.phone}</p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="order-detail-item col-lg-3 col-md-6 col-6">
                <div className="row order-detail-item-content">
                  <div className="col-md-3 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-9 center">
                    <h7 className="order-detail-title">
                      <strong>Địa chỉ giao hàng</strong>
                    </h7>
                    <p className="order-detail-text">{order.shippingAddress}</p>
                    {!order.confirmed ? (
                      <Link className="btn-link" to={"/shipping"}>
                        Thay đổi
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="order-detail-item col-lg-3 col-md-6 col-6">
                <div className="row order-detail-item-content">
                  <div className="col-md-3 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-9 center">
                    <h7 className="order-detail-title">
                      <strong>Thông tin người giao hàng</strong>
                    </h7>
                    {order.confirmed && !order.shipper ? (
                      <>
                        <p className="order-detail-text">Đơn hàng đang chuẩn bị để gửi đi</p>
                      </>
                    ) : order.confirmed && order.shipper ? (
                      <>
                        <p>{order.shipper.name} </p>
                        <p>{order.shipper.phone}</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {/* 4 */}
              <div className="order-detail-item col-lg-3 col-md-6 col-6">
                <div className="row order-detail-item-content">
                  <div className="col-md-3 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h7 className="order-detail-title">
                      <strong>Trạng thái đơn hàng</strong>
                    </h7>
                    {order.cancelled ? (
                      <div className="status__order-user border border-danger text-danger text-center fw-bold">
                        Đơn hàng bị đã hủy
                      </div>
                    ) : order.delivered ? (
                      <>
                        <div className="status__order-user border border-success fw-bold  text-success text-center">
                          <p>Giao hàng thành công</p>
                          {moment(order.deliveredAt).format("LT")}&nbsp;{moment(order.deliveredAt).format("DD/MM/yyyy")}
                        </div>
                      </>
                    ) : order.confirmed ? (
                      <>
                        <div className="status__order-user border border-success fw-bold  text-success text-center ">
                          Đang giao
                        </div>
                        {order.estimatedDeliveryDate && (
                          <p className="order-detail-text">
                            Đơn hàng sẽ được giao trước ngày:{" "}
                            <b>{moment(order.estimatedDeliveryDate).format("DD/MM/yyyy")}</b>
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="status__order-user border border-danger fw-bold text-center text-danger">
                        Đang chờ xác nhận
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order?.orderItems?.length === 0 ? (
                  <Message variant="alert-info mt-5">Bạn chưa có sản phẩm nào trong đơn hàng</Message>
                ) : (
                  <>
                    {order?.orderItems?.map((item, index) => (
                      <div className="order-products-item row" key={index}>
                        <div className="col-lg-2 col-md-2 col-3">
                          <Link to={`/product/${item.product.slug}`}>
                            <img src={item.image} alt={item.name} />
                          </Link>
                        </div>
                        <div className="col-lg-4 px-2 col-md-4 col-6 d-flex align-items-center">
                          <Link to={`/product/${item.product.slug}`}>
                            <h6>{item.name.length >= 50 ? `${item.name.slice(0, 50)}...` : ` ${item.name}`}</h6>
                          </Link>
                        </div>
                        <div className="order-products-item-qty mt-3 mt-md-0  col-lg-2 col-md-2 col-3  d-flex align-items-center flex-column justify-content-center ">
                          <h4>Số lượng</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="unit__price mt-3 mt-md-0 col-lg-2 col-md-2 col-9  d-flex align-items-center flex-column justify-content-center ">
                          <h4>Đơn giá</h4>
                          <h6>{formatCash(item.price)}</h6>
                        </div>
                        <div className="order-products-item-total mt-3 mt-md-0 col-lg-2 col-md-2 col-3 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>Thành tiền</h4>
                          <h6 className="text-primary-color fw-bold">{formatCash(item.qty * item.price)}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-4 d-flex align-items-end flex-column subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Tổng tiền sản phẩm</strong>
                      </td>
                      <td>{formatCash(order.itemsPrice)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phí vận chuyển</strong>
                      </td>
                      <td>{formatCash(order.shippingPrice)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng cộng</strong>
                      </td>
                      <td>{formatCash(order.totalPrice)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phương thức thanh toán </strong>
                      </td>
                      <td>{order.paymentMethod}</td>
                    </tr>
                  </tbody>
                </table>
                {order.confirmed ? (
                  <button className="btn fs-primary btn-primary">Liên hệ cửa hàng</button>
                ) : !order.cancelled ? (
                  <>
                    {loadingCancel && <Loading />}
                    <button
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      className="btn-danger fs-primary col-12 btn-size mt-2"
                    >
                      Hủy đơn hàng
                    </button>
                  </>
                ) : (
                  <button className="col-12 btn-danger fs-primary fw-bold mt-2">Đơn hàng đã bị hủy</button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
