import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectShipper } from "../../../Redux/Actions/orderActions";
import moment from "moment";
import { Link } from "react-router-dom";

const OrderDetailInfo = (props) => {
  const { order, shippers } = props;
  const dispatch = useDispatch();
  const [shipper, setShipper] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [validate, setValidate] = useState({});

  useEffect(() => {
    if (order?.shipper) {
      setShipper(order.shipper);
    }
    if (order?.estimatedDeliveryDate) {
      setEstimatedDeliveryDate(order.estimatedDeliveryDate);
    }
  }, [order]);

  const confirmHandle = () => {
    dispatch(selectShipper(order._id, shipper, estimatedDeliveryDate));
  };
  return (
    <>
      {/* Modal shipper */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ margin: "9.5rem auto" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông tin giao hàng
              </h5>
              <button
                type="button"
                className="close px-1"
                data-dismiss="modal"
                aria-label="Close"
                style={{ color: "black", border: "none", backgroundColor: "white", fontSize: "30px" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label" style={{ minWidth: "200px" }}>
                    Nhân viên giao hàng
                  </label>
                  <select className="form-select" value={shipper} onChange={(e) => setShipper(e.target.value)}>
                    <option value="">Chọn nhân viên giao hàng</option>
                    {shippers?.map((user) => (
                      <>
                        <option value={user._id}>{user.name}</option>
                      </>
                    ))}
                  </select>
                  <p className="msg__validate">{validate.shipper}</p>
                </div>
                <div className="form-group mb-3">
                  <label for="deliver-time" className="col-form-label" style={{ minWidth: "200px" }}>
                    Ngày giao hàng dự kiến
                  </label>
                  <input
                    id="deliver-time"
                    classNameName=""
                    type="date"
                    name="deliver-time"
                    value={estimatedDeliveryDate}
                    onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                    onClick={() => {
                      setValidate((values) => {
                        const x = { ...values };
                        x.estimatedDeliveryDate = "";
                        return x;
                      });
                    }}
                  ></input>
                  <p className="msg__validate">{validate.estimatedDeliveryDate}</p>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Đóng
              </button>
              <button
                id="confirm-shipper"
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => confirmHandle()}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5 order-info-wrap">
        <div className="col-md-6 col-lg-2 col-md-6 col-6">
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

        <div className="col-md-6 col-lg-4 col-md-6 col-6">
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
        <div className="col-md-6 col-lg-3 col-md-6 col-6">
          <article className="icontext align-items-start">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-truck-moving"></i>
            </span>
            <div className="text">
              <h6 className="fw-bold mb-1">Trạng thái đơn hàng</h6>
              <div className="mt-1">
                {order.cancelled ? (
                  <span className="badge3 btn-danger">Đơn hàng đã bị hủy</span>
                ) : order.delivered ? (
                  <>
                    <span className="badge3 btn-success">Giao hàng thành công</span>
                    <p>
                      {moment(order.deliveredAt).format("LT")}&nbsp;
                      {moment(order.deliveredAt).format("DD/MM/yyyy")}
                    </p>
                  </>
                ) : order.confirmed ? (
                  <>
                    <span className="badge3 btn-warning">Đang giao</span>
                    {order.estimatedDeliveryDate && (
                      <p>Ngày giao hàng dự kiến: {moment(order.estimatedDeliveryDate).format("DD/MM/yyyy")}</p>
                    )}
                  </>
                ) : (
                  <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                )}
              </div>
            </div>
          </article>
        </div>
        <div className="col-md-6 col-lg-3 col-md-6 col-6">
          <article className="icontext align-items-start">
            <span className="icon icon-sm rounded-circle alert-success">
              <i class="text-success fas fa-user-check"></i>
            </span>
            <div className="text">
              <h6 className="fw-bold mb-1">Nhân viên giao hàng</h6>
              {order.shipper ? (
                <>
                  <p>{order.shipper.name} </p>
                  <p>{order.shipper.phone}</p>
                  <button
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                    className="btn btn-primary col-12 btn-size"
                    hidden={order.cancelled || order.delivered}
                  >
                    Thay đổi
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                    className="btn btn-primary col-12 btn-size"
                    disabled={!order.confirmed}
                  >
                    Chọn nhân viên giao hàng
                  </button>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default OrderDetailInfo;
