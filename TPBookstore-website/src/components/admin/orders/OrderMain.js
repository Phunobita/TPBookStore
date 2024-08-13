import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Message from "./../../base/LoadingError/Error";
import Loading from "./../../base/LoadingError/Loading";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../Redux/Actions/orderActions";
import { toast } from "react-toastify";
import { ORDER_DELETE_RESET, ORDER_HIDDEN_RESET, ORDER_SHOW_RESET } from "../../../Redux/Constants/orderConstants";
import Toast from "../../base/LoadingError/Toast";
import PaginationAdmin from "../Home/PaginationAdmin";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const OrderMain = (props) => {
  const { keyword, pageNumber } = props;
  // const statusHidden = useSelector((state) => state.orderHiddenAdmin);
  // const { success: successHidden, error: errorHidden } = statusHidden;

  let history = useHistory();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchById, setSearchById] = useState("");

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders, page, pages, total } = orderListAdmin;

  const deleteOrder = useSelector((state) => state.orderDeleteAdmin);
  const { success: successDelOrder, error: errorDelOrder } = deleteOrder;

  const hiddenOrder = useSelector((state) => state.orderHiddenAdmin);
  const { success: successHiddenOrder, error: errorHiddenOrder } = hiddenOrder;

  const showOrder = useSelector((state) => state.orderShowAdmin);
  const { success: successShowOrder, error: errorShowOrder } = showOrder;

  useEffect(() => {
    if (successDelOrder) {
      toast.success("Xóa đơn hàng thành công!", ToastObjects);
      dispatch({ type: ORDER_DELETE_RESET });
    }
    if (errorDelOrder) {
      toast.error(errorDelOrder, ToastObjects);
      dispatch({ type: ORDER_DELETE_RESET });
    }

    if (successHiddenOrder) {
      toast.success("Ẩn đơn hàng thành công!", ToastObjects);
      dispatch({ type: ORDER_HIDDEN_RESET });
    }
    if (errorHiddenOrder) {
      toast.error(errorHiddenOrder, ToastObjects);
      dispatch({ type: ORDER_HIDDEN_RESET });
    }

    if (successShowOrder) {
      toast.success("Bỏ ẩn đơn hàng thành công!", ToastObjects);
      dispatch({ type: ORDER_SHOW_RESET });
    }
    if (errorShowOrder) {
      toast.error(errorShowOrder, ToastObjects);
      dispatch({ type: ORDER_SHOW_RESET });
    }
  }, [
    dispatch,
    successDelOrder,
    errorDelOrder,
    successHiddenOrder,
    errorHiddenOrder,
    successShowOrder,
    errorShowOrder
  ]);

  useEffect(() => {
    dispatch(listOrders(keyword, status, limit, pageNumber));
  }, [dispatch, successDelOrder, keyword, status, limit, pageNumber, successHiddenOrder, successShowOrder]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchById.trim()) {
      history.push(`/admin/orders?q=${searchById}`);
    } else {
      history.push("/admin/orders");
    }
  };
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Đơn hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <h5 className="title__top" style={{ top: "-48px" }}>
            Tổng đơn hàng:&nbsp;{total}
          </h5>
          <div className="row gx-3 py-3">
            <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Tìm kiếm theo mã đơn hàng"
                className="form-control"
                value={searchById}
                onChange={(e) => setSearchById(e.target.value)}
              />
            </form>

            <div className="col-lg-2 mx-2 col-6 col-md-3">
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={""}>Trạng thái</option>
                <option value={"waiting"}>Đang chờ xác nhận</option>
                <option value={"delivering"}>Đang giao</option>
                <option value={"delivered"}>Đã giao</option>
                <option value={"paid"}>Đã thanh toán</option>
                <option value={"unpaid"}>Chưa thanh toán</option>
                <option value={"cancelled"}>Đã hủy</option>
                <option value={"notDisable"}>Chưa bị ẩn</option>
                <option value={"disabled"}>Đã bị ẩn</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value={"10"}>10 đơn hàng</option>
                <option value={"20"}>20 đơn hàng</option>
                <option value={"30"}>30 đơn hàng</option>
                <option value={"40"}>40 đơn hàng</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/orders"} />
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
