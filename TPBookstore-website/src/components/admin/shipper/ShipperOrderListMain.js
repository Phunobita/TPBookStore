import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrdersByShipper } from "../../../Redux/Actions/orderActions";
import formatCash from "../../../utils/formatCash";
import moment from "moment";

const ShipperOrderListMain = () => {
  const dispatch = useDispatch();
  const orderListOfShipper = useSelector((state) => state.orderListOfShipper);
  const { loading, error, orders, page, pages, total } = orderListOfShipper;
  const totalOrdersDelivered = orders?.filter((order) => order.delivered === true).length;
  const totalOrdersNotDelivered = orders?.filter((order) => order.delivered === false).length;
  useEffect(() => {
    dispatch(listOrdersByShipper());
  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="">
          <h3 className="list__order-shipper-title fw-bold my-3 text-center">ĐƠN HÀNG ĐƯỢC GIAO CHO BẠN</h3>
        </div>
        <div className="list__order-shipper">
          <p>
            <b>Tổng đơn hàng:</b>&nbsp;{orders?.length}
          </p>
          <p>
            <b>Số đơn hàng chưa giao:</b>&nbsp;{totalOrdersNotDelivered}
          </p>
          <p>
            <b>Số đơn hàng đã giao thành công:</b>&nbsp;{totalOrdersDelivered}
          </p>
        </div>
        {/* PC */}
        <div className="card list__order-shipper-pc">
          <table className="table">
            <thead className="pc-header">
              <tr className="text-center">
                <th>Mã hoá đơn</th>
                <th>Người nhận</th>
                <th>Điện thoại</th>
                <th>Địa chỉ giao hàng</th>
                <th>Ngày giao</th>
                <th>Tổng hoá đơn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {!orders?.length > 0 ? (
                <div>Không có đơn hàng nào được giao cho bạn</div>
              ) : (
                orders?.map((order, index) => (
                  <>
                    <tr>
                      <td>
                        <Link to={`/shipper/order/${order._id}`}>{order._id}</Link>
                      </td>
                      <td className="fw-bold">{order.receiver}</td>
                      <td>{order.phone}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{order.delivered ? <>{moment(order.deliveredAt).format("DD/MM/yyyy")}</> : "--/--/----"}</td>
                      <td>{formatCash(order.totalPrice)}</td>
                      <td>
                        {order.cancelled ? (
                          <span className="badge3 btn-danger">Đã hủy</span>
                        ) : order.delivered ? (
                          <span className="badge3 btn-success">Giao hàng thành công</span>
                        ) : (
                          <span className="badge3 btn-warning">Chưa giao</span>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tablet and Mobile */}
        <div className=" card list__order-shipper-mobile">
          {!orders?.length > 0 ? (
            <div>Không có đơn hàng nào được giao cho bạn</div>
          ) : (
            orders?.map((order, index) => (
              <>
                <div className=" row list__order-shipper-mobile-item p-2">
                  <div className="col-md-8">
                    <div>
                      <Link to={`/shipper/order/${order._id}`}>
                        <b>Mã hoá đơn: </b>&nbsp; {order._id}
                      </Link>
                    </div>
                    <div className="">
                      <b>Thông tin người nhận</b>
                      <div>
                        {order.receiver} &nbsp; | &nbsp; {order.phone}
                      </div>
                      <div>{order.shippingAddress}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <b>Ngày giao: &nbsp;</b>
                      {order.delivered ? <>{moment(order.deliveredAt).format("DD/MM/yyyy")}</> : "--/--/----"}
                    </div>
                    <div>
                      <b>Tổng đơn hàng:</b> &nbsp;{formatCash(order.totalPrice)}{" "}
                    </div>
                    <div>
                      <b>Trạng thái: </b>&nbsp;
                      {order.cancelled ? (
                        <span className="badge3 btn-danger">Đã hủy</span>
                      ) : order.delivered ? (
                        <span className="badge3 btn-success">Giao hàng thành công</span>
                      ) : (
                        <span className="badge3 btn-warning">Chưa giao</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default ShipperOrderListMain;
