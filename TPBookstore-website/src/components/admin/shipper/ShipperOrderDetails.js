import React, { useEffect, useState } from "react";
import OrderDetailProducts from "../orders/OrderDetailProducts";
import { Link } from "react-router-dom";
import formatCash from "../../../utils/formatCash";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrderDetails } from "./../../../Redux/Actions/orderActions";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import moment from "moment";
import Modal from "../../base/modal/Modal";
const ShipperOrderDetails = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((accumulate, item) => accumulate + item.price * item.qty, 0);
  }

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return (
    <>
      <Modal
        modalTitle={"Xác nhận giao hàng thành công"}
        modalBody={"Bạn có chắc đơn hàng đã giao thành công?"}
        btnTitle={"Xác nhận"}
        btnType={"confirm"}
        handler={deliverHandler}
      />
      <section className="content-main">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className={order.isDisabled ? `card status-disabled` : `card`}>
            <header className="card-header p-3 Header-green">
              <div className="row align-items-center ">
                <div className="col-lg-1 col-md-1">
                  <Link to="/shipper/orders" className="btn">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </Link>
                </div>
                <div className="col-lg-5 col-md-5">
                  <i class="far fa-barcode-alt"></i>
                  <b className="text-white mx-1">Mã đơn hàng:</b>
                  <span className="text-white mx-1">{order._id}</span>
                  <br />
                  <span>
                    <i className="far fa-calendar-alt"></i>
                    <b className="text-white">Ngày đặt:</b>
                    <span className="text-white mx-3 ">
                      {moment(order.createdAt).format("LT") + " " + moment(order.createdAt).format("DD/MM/yyyy")}
                    </span>
                  </span>
                </div>
                <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                  <Link className="btn btn-success ms-2" to="#">
                    <i className="fas fa-print"></i>
                  </Link>
                </div>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <div className="row mb-5 order-info-wrap">
                <div className="col-md-6 col-lg-2 col-md-6 col-12">
                  <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                      <i className="text-success fas fa-user"></i>
                    </span>
                    <div className="text">
                      <h6 className="fw-bold mb-1">Khách hàng</h6>
                      <p className="mb-1">
                        {order.user.name} <br />
                        {order.user.phone} <br />
                      </p>
                    </div>
                  </article>
                </div>

                <div className="col-md-6 col-lg-4 col-md-6 col-12">
                  <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                      <i className="text-success fas fa-map-marker-alt"></i>
                    </span>
                    <div className="text">
                      <h6 className="fw-bold mb-1">Thông tin người nhận</h6>
                      <p className="">
                        {order.receiver} &nbsp;| &nbsp;{order.phone}
                      </p>
                      <p className=""></p>
                      <p className="">{order.shippingAddress}</p>
                    </div>
                  </article>
                </div>
                <div className="col-md-6 col-lg-3 col-md-6 col-12">
                  <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                      <i className="text-success fas fa-truck-moving"></i>
                    </span>
                    <div className="text">
                      <h6 className="fw-bold mb-1">Trạng thái đơn hàng</h6>
                      <div className="mt-1">
                        {order.cancelled ? (
                          <span className="badge3 btn-danger">Đã bị hủy</span>
                        ) : order.delivered ? (
                          <span className="badge3 btn-success">Giao hàng thành công</span>
                        ) : order.confirmed ? (
                          <span className="badge3 btn-warning">Đang giao</span>
                        ) : (
                          <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="table-responsive">
                    <OrderDetailProducts order={order} loading={loading} />
                  </div>
                </div>
                {/* Payment Info */}
                <div className="col-lg-4 px-0">
                  <table className="table__order-details mx-0">
                    <tr>
                      <td>
                        <article className="float-end">
                          <dl className="dlist">
                            <dt className="text-start">Tổng tiền sản phẩm:</dt>{" "}
                            <dd className="mx-0 text-end">{formatCash(order.itemsPrice)}</dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Phí vận chuyển: </dt>{" "}
                            <dd className="mx-0 text-end">{formatCash(order.shippingPrice)}</dd>
                          </dl>
                          <dl className="dlist">
                            {/* <dt className="text-start">Thuế VAT(5%):</dt>{" "} */}
                            {/* <dd className="mx-0 text-end">{formatCash(order.taxPrice)}</dd> */}
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Tổng tiền:</dt>
                            <dd className="mx-0 text-end">
                              <b>{formatCash(order.totalPrice)}</b>
                            </dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Phương thức thanh toán:</dt>
                            <dd className="mx-0 text-start" style={{ fontSize: "15px" }}>
                              <span className="">{order.paymentMethod}</span>
                            </dd>
                          </dl>
                        </article>
                      </td>
                    </tr>
                  </table>
                  <div className="box shadow-sm bg-light">
                    {!order.cancelled ? (
                      <div>
                        {order?.delivered ? (
                          <button className="btn btn-success col-12">
                            <p>Giao hàng thành công&nbsp;</p>
                            <p>
                              ({moment(order.deliveredAt).format("LT")}&nbsp;
                              {moment(order.deliveredAt).format("DD/MM/yyyy")})
                            </p>
                          </button>
                        ) : (
                          <>
                            {loadingDelivered && <Loading />}
                            <button
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              className="btn btn-primary col-12 btn-size"
                            >
                              Xác nhận giao hàng thành công
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <button className="btn btn-danger col-12 btn-size mt-2">Đơn hàng đã bị hủy</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ShipperOrderDetails;
