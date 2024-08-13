import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteOrderAdmin, hiddenOrderAdmin, showOrderAdmin } from "../../../Redux/Actions/orderActions";
import formatCash from "../../../utils/formatCash";
import Modal from "../../base/modal/Modal";

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = props;

  const [orderIdSelected, setOrderIdSelected] = useState("");

  const handleDeleteOrder = () => {
    dispatch(deleteOrderAdmin(orderIdSelected));
  };

  const handleHiddenOrder = () => {
    dispatch(hiddenOrderAdmin(orderIdSelected));
  };

  const handleShowOrder = () => {
    dispatch(showOrderAdmin(orderIdSelected));
  };

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [btnType, setBtnType] = useState("");
  const [typeAction, setTypeAction] = useState(() => {});

  const typeModal = (type) => {
    if (type === "hiddenOrder") {
      setModalTitle("Xác nhận ẩn đơn hàng");
      setModalBody("Bạn có chắc muốn ẩn đơn hàng này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "showOrder") {
      setModalTitle("Xác nhận bỏ ẩn đơn hàng");
      setModalBody("Bạn có chắc muốn bỏ ẩn đơn hàng này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "deleteOrder") {
      setModalTitle("Xác nhận xoá đơn hàng");
      setModalBody("Bạn có chắc xoá đơn hàng này ?");
      setBtnTitle("Xoá");
      setBtnType("delete");
      setTypeAction(type);
    }
  };

  return (
    <>
      <Modal
        modalTitle={modalTitle}
        modalBody={modalBody}
        btnTitle={btnTitle}
        btnType={btnType}
        handler={
          typeAction === "showOrder"
            ? handleShowOrder
            : typeAction === "hiddenOrder"
            ? handleHiddenOrder
            : handleDeleteOrder
        }
      ></Modal>
      <table className="table">
        <thead>
          <tr className="text-center">
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Ngày đặt</th>
            <th scope="col">Nhân viên giao hàng</th>
            <th scope="col">Trạng thái</th>
            <th scope="col" className="text-end">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map(
              (order) => (
                // order.isDisabled ? (
                <tr key={order._id}>
                  <td className={order.isDisabled ? `status-disabled` : ``}>
                    <td>
                      <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
                    </td>
                  </td>
                  <td className={order.isDisabled ? `status-disabled` : ``}>
                    <b>
                      {order.user?.name.length >= 15 ? `${order.user?.name.slice(0, 15)}...` : `${order.user?.name}`}
                    </b>
                  </td>
                  {/* <td>
                    <b>{order.receiver}</b>
                  </td> */}
                  <td className={order.isDisabled ? `status-disabled` : ``}>{formatCash(order.totalPrice)}</td>
                  {/* <td className={order.isDisabled ? `status-disabled` : ``}>
                    {order.isPaid ? (
                      <span className="badge3 rounded-pill alert-success fw-bold">
                        Thanh toán lúc {moment(order.paidAt).format("DD/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                    )}
                  </td> */}

                  <td className={order.isDisabled ? `status-disabled` : ``}>
                    {moment(order.createdAt).format("DD/MM/yyyy")}
                  </td>
                  <td className={order.isDisabled ? `status-disabled` : ``}>
                    {order.shipper ? (
                      <b>
                        {order.shipper?.name?.length > 15
                          ? `${order.shipper?.name.slice(0, 15)}...`
                          : `${order.shipper?.name}`}
                      </b>
                    ) : (
                      <>-----</>
                    )}
                  </td>
                  <td className={order.isDisabled ? `status-disabled` : ``}>
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
                  <td className="d-flex justify-content-center align-item-center">
                    <div className="dropdown">
                      <div data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                        <i class="fas fa-ellipsis-h"></i>
                      </div>
                      <div className="dropdown-menu action__order">
                        {order.isDisabled ? (
                          <Link
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() => {
                              typeModal("showOrder");
                              setOrderIdSelected(order._id);
                            }}
                          >
                            <i class="fas fa-eye-slash"></i>
                          </Link>
                        ) : (
                          <Link
                            className="text-success dropdown-item"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() => {
                              typeModal("hiddenOrder");
                              setOrderIdSelected(order._id);
                            }}
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        )}

                        <Link
                          className="dropdown-item"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={() => {
                            typeModal("deleteOrder");
                            setOrderIdSelected(order._id);
                          }}
                        >
                          <i class="text-danger fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    </div>

                    {/* <Link to={`/admin/order/${order._id}`}>
                      <i class="fas fa-ellipsis-h ms-3"></i>
                    </Link> */}
                  </td>
                </tr>
              )
              // ) : (
              //   <tr className="" key={order._id}>
              //     <td className={order.isDisabled ? `status-disabled` : ``}>
              //       <td>
              //         <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
              //       </td>
              //     </td>
              //     <td>
              //       <b>{order.user.name.length >= 15 ? `${order.user.name.slice(0, 15)}...` : `${order.user.name}`}</b>
              //     </td>
              //     <td>{formatCash(order.totalPrice)}</td>
              //     <td>
              //       {order.isPaid ? (
              //         <span className="badge3 rounded-pill alert-success fw-bold">
              //           Thanh toán lúc {moment(order.paidAt).format("DD/MM/yyyy")}
              //         </span>
              //       ) : (
              //         <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
              //       )}
              //     </td>
              //     <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
              //     <td>
              //       {order.cancelled ? (
              //         <span className="badge3 btn-danger">Đã hủy</span>
              //       ) : order.delivered ? (
              //         <span className="badge3 btn-success">Đã giao</span>
              //       ) : order.confirmed ? (
              //         <span className="badge3 btn-warning">Đang giao</span>
              //       ) : (
              //         <span className="badge3 btn-primary">Đang chờ xác nhận</span>
              //       )}
              //     </td>
              //     <td className="d-flex justify-content-end align-item-center">
              //       <Link className="text-success">
              //         <i className="fas fa-eye" onClick={() => handleHiddenOrder(order._id)}></i>
              //       </Link>
              //       <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
              //         <i class="text-danger fas fa-trash-alt ms-3" onClick={() => setOrderIdDelete(order._id)}></i>
              //       </Link>
              //       {/* <Link to={`/admin/order/${order._id}`}>
              //         <i class="fas fa-ellipsis-h ms-3"></i>
              //       </Link> */}
              //     </td>
              //   </tr>
              // )
            )}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
