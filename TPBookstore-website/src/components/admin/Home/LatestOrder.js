import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "./../../base/LoadingError/Error";
import Loading from "./../../base/LoadingError/Loading";
import formatCash from "../../../utils/formatCash";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h4 className="card-title">Đơn hàng mới</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Tổng cộng</th>
                <th scope="col">Trạng thái thanh toán</th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Trạng thái</th>
                <th scope="col" className="text-end">
                  Xem
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <td>
                      <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
                    </td>
                  </td>
                  <td>
                    <b>{order.user.name.lenght >= 15 ? `${order.user.name.slice(0, 15)}...` : `${order.user.name}`}</b>
                  </td>
                  <td>{formatCash(order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge3 rounded-pill alert-success fw-bold">
                        Thanh toán lúc {moment(order.paidAt).format("DD/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
                  <td>
                    {order.cancelled ? (
                      <span className="badge3 btn-danger">Đã hủy</span>
                    ) : order.delivered ? (
                      <span className="badge3 btn-success">Đã giao</span>
                    ) : order.confirmed ? (
                      <span className="badge3 btn-warning">Đang giao</span>
                    ) : (
                      <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/admin/order/${order._id}`} className="text-success">
                      <i class="fas fa-directions" style={{ fontSize: "20px" }}></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
