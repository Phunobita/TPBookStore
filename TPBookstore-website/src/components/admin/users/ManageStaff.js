import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";
import Modal from "../../base/modal/Modal";

const ManageStaff = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { keyword, pageNumber } = props;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages, total } = userList;

  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState("all_staff");
  //
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };
  useEffect(() => {
    dispatch(listUser(keyword, role, status, limit, pageNumber));
  }, [dispatch, keyword, role, status, limit, pageNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      history.push(`/admin/staff?q=${searchKeyword}`);
    } else {
      history.push("/admin/staff");
    }
  };

  /// và tại đây nữa
  const [productIdSelected, setProductIdSelected] = useState("");
  const deleteHandler = () => {
    // dispatch(deleteProductAdmin(productIdSelected));
  };

  const hiddenHandler = () => {
    // dispatch(hiddenProductAdmin(productIdSelected));
  };

  const showHandler = () => {
    // dispatch(showProductAdmin(productIdSelected));
  };

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [btnType, setBtnType] = useState("");
  const [typeAction, setTypeAction] = useState(() => {});

  const typeModal = (type) => {
    if (type === "hiddenProduct") {
      setModalTitle("Xác nhận tài khoản");
      setModalBody("Bạn có chắc muốn ẩn tài khoản này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "showProduct") {
      setModalTitle("Xác nhận bỏ ẩn tài khoản");
      setModalBody("Bạn có chắc muốn bỏ ẩn tài khoản này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "deleteProduct") {
      setModalTitle("Xác nhận xoá tài khoản");
      setModalBody("Bạn có chắc xoá tài khoản này ?");
      setBtnTitle("Xoá");
      setBtnType("delete");
      setTypeAction(type);
    }
  };
  return (
    // tại đây nữa
    <>
      <Modal
        modalTitle={modalTitle}
        modalBody={modalBody}
        btnTitle={btnTitle}
        btnType={btnType}
        handler={
          typeAction === "showProduct" ? showHandler : typeAction === "hiddenProduct" ? hiddenHandler : deleteHandler
        }
      ></Modal>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Tài khoản nhân viên</h2>
          <Link to="/admin/createUser">
            <button className="btn btn-primary">Tạo tài khoản</button>
          </Link>
        </div>

        <div className="card mb-4">
          <header className="card-header" style={{ backgroundColor: "#fff" }}>
            <h5 className="title__top" style={{ top: "-48px" }}>
              Tổng tài khoản:&nbsp;{total}
            </h5>
            <div className="row gx-3">
              <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Tìm kiếm nhân viên..."
                  className="form-control "
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </form>
              <div className="col-lg-2 col-6 mx-2 col-md-3">
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value={"all_staff"}>Tất cả nhân viên</option>
                  <option value={"staff"}>Nhân viên bán hàng</option>
                  <option value={"shipper"}>Nhân viên giao hàng</option>
                  <option value={"admin"}>Quản lý</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 mx-2 col-md-3">
                <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                  <option value={"10"}>10 tài khoản</option>
                  <option value={"20"}>20 tài khoản</option>
                  <option value={"30"}>30 tài khoản</option>
                  <option value={"40"}>40 tài khoản</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value={""}>Tất cả trạng thái</option>
                  <option value={"is_active"}>Đang hoạt động</option>
                  <option value={"locked"}>Đang bị khóa</option>
                </select>
              </div>
            </div>
          </header>

          {/* Card */}
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                <table className="table">
                  <thead className="">
                    <tr className="text-center">
                      <th scope="col">Mã nhân viên</th>
                      <th scope="col">Tên nhân viên</th>
                      <th scope="col">Email</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Chức vụ</th>
                      <th scope="col">Ngày vào làm</th>
                      <th scope="col" className="text-end">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className={user.isDisabled ? `status-disabled` : ``}>
                            <td>
                              <Link to={`/admin/staff/${user._id}`}>{user._id}</Link>
                            </td>
                          </td>
                          <td className={user.isDisabled ? `status-disabled` : ``}>
                            <b>{user?.name.length > 15 ? `${user?.name.slice(0, 15)}...` : `${user?.name}`}</b>
                          </td>
                          <td className={user.isDisabled ? `status-disabled` : ``}>
                            <b>{user?.email.length > 15 ? `${user?.email.slice(0, 15)}...` : `${user?.email}`}</b>
                          </td>
                          <td className={user.isDisabled ? `status-disabled` : ``}>{user.phone}</td>
                          <td className={user.isDisabled ? `status-disabled` : ``}>
                            {user.role === "staff"
                              ? `Nhân viên bán hàng`
                              : user.role === "shipper"
                              ? `Nhân viên giao hàng`
                              : user.role === "customer"
                              ? `Khách hàng`
                              : `Quản lý`}
                          </td>
                          <td className={user.isDisabled ? `status-disabled` : ``}>
                            {user.createdAt.length > 11 ? user.createdAt.slice(0, 10) : user.createdAt}
                          </td>
                          <td className="d-flex justify-content-center align-item-center">
                            <div className="dropdown">
                              <div data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                                <i class="fas fa-ellipsis-h"></i>
                              </div>
                              <div className="action__product dropdown-menu">
                                {user.isDisabled ? (
                                  <Link className="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter">
                                    <i
                                      class="fas fa-eye-slash"
                                      onClick={() => {
                                        typeModal("showProduct");
                                        setProductIdSelected(user._id);
                                      }}
                                      style={{ opacity: "1" }}
                                    ></i>
                                    &nbsp; Bỏ ẩn
                                  </Link>
                                ) : (
                                  <>
                                    <Link className="dropdown-item" to={`/admin/user/${user._id}/edit`}>
                                      <i className="fas fa-edit text-warning "></i> &nbsp; Sửa
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                      onClick={() => {
                                        typeModal("hiddenProduct");
                                        setProductIdSelected(user._id);
                                      }}
                                      style={{ opacity: "1" }}
                                    >
                                      <i className="fas fa-eye text-success"></i>
                                      &nbsp; Ẩn
                                    </Link>
                                  </>
                                )}

                                <Link className="dropdown-item">
                                  <i
                                    class="fas fa-trash-alt edit__products text-danger"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => {
                                      typeModal("deleteProduct");
                                      setProductIdSelected(user._id);
                                    }}
                                    style={{ opacity: "1" }}
                                  ></i>
                                  &nbsp; Xoá
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/staff"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageStaff;
