import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";

const UserListComponent = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { keyword, pageNumber } = props;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages, total } = userList;

  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(8);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };
  useEffect(() => {
    dispatch(listUser(keyword, status, limit, pageNumber));
  }, [dispatch, keyword, status, limit, pageNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      history.push(`/admin/users?q=${searchKeyword}`);
    } else {
      history.push("/admin/users");
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Khách hàng</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header" style={{ backgroundColor: "#fff" }}>
          <h5 className="title__top" style={{ top: "-48px" }}>
            Tổng khách hàng:&nbsp;{total}
          </h5>
          <div className="row gx-3">
            <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm khách hàng"
                className="form-control "
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </form>
            <div className="col-lg-2 col-6 mx-2 col-md-3">
              <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value={"8"}>8 tài khoản</option>
                <option value={"12"}>12 tài khoản</option>
                <option value={"16"}>16 tài khoản</option>
                <option value={"20"}>20 tài khoản</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={""}>Tất cả</option>
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
              {users &&
                users.map((user) => (
                  <Link to={`/admin/user/${user._id}`}>
                    <div className="col" key={user._id}>
                      <div className="card card-user shadow-sm">
                        <div className="card-header">
                          <img
                            className="img-md img-avatar"
                            src={user.avatarUrl}
                            onError={onAvatarLoadError}
                            alt="User pic"
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title mt-5" title={user.name}>
                            {`${user.name.length} >= 15` ? `${user.name.slice(0, 15)}...` : `${user.name}`}
                          </h5>
                          <div className="card-text text-muted">
                            {user.role === "admin" ? <p className="m-0">Admin</p> : <p className="m-0">Customer</p>}

                            <p>
                              <a href={`mailto:${user.email}`} title={user.email}>
                                {`${user.email.length} >= 15` ? `${user.email.slice(0, 20)}...` : `${user.email}`}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/users"} />
        </div>
      </div>
    </section>
  );
};

export default UserListComponent;
