import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUserDetails, disableUser } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";

const UserDetail = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.adminGetUserDetails);
  const { loading, error, user } = userDetails;
  const userDisable = useSelector((state) => state.userDisable);
  const { loading: loadingDisable, error: errorDisable, success: successDisable } = userDisable;

  useEffect(() => {
    dispatch(adminGetUserDetails(userId));
  }, [dispatch, userId, successDisable]);
  const disableHandle = () => {
    dispatch(disableUser(user._id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="user-information__admin">
            <div className="user-information__admin-header">Thông tin tài khoản</div>
            {/* User name */}
            <div className="col-md-12 mt-5 ">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Tên khách hàng</label>
                <label>{user.name ?? ""}</label>
              </div>
            </div>

            {/* Phone number */}
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Số điện thoại</label>
                <label>{user.phone ?? ""}</label>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Địa chỉ e-mail</label>
                <label>{user.email ?? ""}</label>
              </div>
            </div>

            {/* Sex */}

            {user.sex === "" ? (
              <></>
            ) : (
              <>
                <div className="user-information__admin-item">
                  <label className="user-information__admin-title">Giới tính</label>
                  <label className="text-capitalize">{user.sex ?? ""}</label>
                </div>
              </>
            )}

            {/* <label className="text-capitalize">{user.sex ?? ""}</label> */}

            {/*Birthday*/}
            {user.birthday === "" ? (
              <></>
            ) : (
              <>
                <div className="user-information__admin-item">
                  <label className="user-information__admin-title">Ngày sinh</label>
                  <label>{user.birthday ?? ""}</label>
                </div>
              </>
            )}

            {/* ADDRESS */}
            {user.address?.specificAddress === "" ||
            user.address?.ward === "" ||
            user.address?.district === "" ||
            user.address?.province === "" ? (
              <></>
            ) : (
              <>
                <div className="col-md-12">
                  <div className="user-information__admin-item">
                    <label className="user-information__admin-title">Địa chỉ</label>
                    <label>
                      {user.address?.specificAddress?.concat(
                        ", ",
                        user.address?.ward,
                        ", ",
                        user.address?.district,
                        ", ",
                        user.address?.province
                      )}
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Trạng thái</label>
                {user.disabled ? <label>Đã bị khoá</label> : <label>Đang hoạt động</label>}
              </div>
            </div>
          </div>
          <div className="d-flex user-information__admin-btn1 justify-content-center">
            {user.disabled ? (
              <button className=" btn btn-danger mx-2">Huỷ khoá tài khoản</button>
            ) : (
              <button className=" btn btn-danger mx-2" onClick={() => disableHandle()}>
                Khoá tài khoản
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default UserDetail;
