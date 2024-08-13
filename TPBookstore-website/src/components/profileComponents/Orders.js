import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../base/LoadingError/Error";
import Loading from "../base/LoadingError/Loading";
import formatCash from "../../utils/formatCash";

const Orders = (props) => {
  const { loading, error, orders } = props;

  return (
    <div className="profile__order d-flex justify-content-center align-items-center  flex-column">
      <p className="title__top-order">Tổng đơn hàng: {orders?.length}</p>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders?.length === 0 ? (
            <div className="col-12 alert alert-info text-center">
              Bạn chưa có đơn hàng nào
              <Link
                className="btn btn-bg-main mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px"
                }}
              >
                BẮT ĐẦU MUA HÀNG
              </Link>
            </div>
          ) : (
            <div className="shadow-sm table-responsive">
              {orders?.map((order) => (
                <div key={order._id} className=" p-3 mb-3 bg-body rounded shadow">
                  <Link to={`/order/${order._id}`}>
                    <div className="profile__order-product-title row">
                      <p className="profile__order-product-id col-lg-12">
                        <span className="d-flex fw-bold">
                          Mã đơn hàng:&nbsp; <p style={{ fontWeight: "400" }}>{order._id}</p>
                        </span>
                        <span className="d-flex fw-bold">
                          Ngày đặt:&nbsp;
                          <p style={{ fontWeight: "400" }}>
                            {moment(order.createdAt).format("LT") + " " + moment(order.createdAt).format("DD/MM/YYYY")}
                          </p>
                        </span>
                      </p>
                    </div>

                    {order?.orderItems?.map((item) => (
                      <div key={item._id} className="row d-flex profile__order-product">
                        <div className="col-lg-2 col-md-2 col-4 py-2" style={{ backgroundSize: "cover" }}>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="profile__order-product-name col-lg-4 col-md-4 col-8">
                          <p className="text-upercase">{item.name.length > 80 ? item.name.slice(0, 80) : item.name}</p>
                        </div>
                        <div className="profile__order-product-price col-lg-1 col-md-1 col-6">
                          {formatCash(item.price)}
                        </div>
                        <p className="profile__order-product-qty col-lg-1 col-md-1 col-2 fst-italic">x{item.qty}</p>
                        <div className="profile__order-product-total text-primary-color col-lg-2 col-md-2 col-4 fw-bold">
                          {formatCash(item.price * item.qty)}
                        </div>
                      </div>
                    ))}

                    {/* PC */}
                    <div className="pc-order d-flex justify-content-between align-items-center p-3 border-top border-secondary rounded">
                      <div className="fs-6">
                        {order.isPaid ? (
                          <span className="text-success border border-success rounded-pill ps-2 pe-2">
                            <i className="fas fa-dollar-sign"></i> Đã thanh toán:{" "}
                            {moment(order.paidAt).format("LT") + " " + moment(order.paidAt).format("DD/MM/YYYY")}
                          </span>
                        ) : (
                          <span className="text-danger border border-danger rounded-pill ps-2 pe-2">
                            <i className="fas fa-dollar-sign"></i> Chưa thanh toán
                          </span>
                        )}
                      </div>
                      <i className="fas fa-long-arrow-alt-right fs-4 opacity-50"></i>
                      <div className="fs-6">
                        {order.cancelled ? (
                          <span className="text-danger border border-danger rounded-pill ps-2 pe-2">
                            <i className="fas fa-truck"></i> Đơn hàng bị đã hủy
                          </span>
                        ) : order.delivered ? (
                          <span className="text-success border border-success rounded-pill ps-2 pe-2">
                            <i className="fas fa-truck"></i> Giao hàng thành công
                          </span>
                        ) : order.confirmed ? (
                          <span className="text-success border border-success rounded-pill ps-2 pe-2">
                            <i className="fas fa-truck"></i> Đang giao
                          </span>
                        ) : (
                          <span className="text-warning border border-warning rounded-pill ps-2 pe-2">
                            <i className="fas fa-truck"></i> Đang chờ xác nhận
                          </span>
                        )}
                      </div>
                      <div className="fw-bold">
                        Tổng: <span className="fs-5 text-primary-color">{formatCash(order.totalPrice)}</span>
                      </div>
                    </div>

                    {/* mobile */}
                    <div className="mobile-order d-flex flex-column align-items-center py-3 border-top border-secondary rounded">
                      <div className="mobile-order__total fs-5 fw-bold">
                        Tổng: <span className="text-danger">{formatCash(order.totalPrice)}</span>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 p-2 flex justify-content-between">
                          {order.isPaid ? (
                            <span className="text-success border border-success rounded-pill ps-2 pe-2">
                              <i className="fas fa-dollar-sign"></i> Đã thanh toán:{" "}
                              {moment(order.paidAt).format("LT") + " " + moment(order.paidAt).format("DD/MM/YYYY")}
                            </span>
                          ) : (
                            <span className="text-danger border border-danger rounded-pill ps-2 pe-2">
                              <i className="fas fa-dollar-sign"></i>Chưa thanh toán
                            </span>
                          )}
                        </div>
                        <div className="col-sm-12">
                          <i className="fas fa-long-arrow-alt-right fs-4 opacity-50 ms-2 me-2"></i>
                          {order.isDelivered ? (
                            <span className="text-success border border-success rounded-pill ps-2 pe-2">
                              <i className="fas fa-truck"></i> Đang giao
                            </span>
                          ) : (
                            <span className="text-danger border border-danger rounded-pill ps-2 pe-2">
                              <i className="fas fa-truck"></i> Đang chờ xác nhận
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
