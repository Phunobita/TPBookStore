import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Toast from "./../base/LoadingError/Toast";
import Loading from "./../base/LoadingError/Loading";
import Message from "./../base/LoadingError/Error";
import { toast } from "react-toastify";
import { updatePassword } from "../../Redux/Actions/userActions";
import { USER_UPDATE_PASSWORD_RESET } from "../../Redux/Constants/userConstants";

const UserPassword = () => {
  const toastObjects = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const getUserUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading: updatePasswordLoading, success, error: errorUpdatePassword } = getUserUpdatePassword;

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: ""
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại*"),
      newPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu mới*")
        .min(8, "Mật khẩu mới phải dài ít nhất 8 ký tự")
        .max(250, "Mật khẩu phải ngắn hơn 250 ký tự")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
        "Mật khẩu mới phải có ít nhất một chữ cái và một số"),
        // .matches(
        //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        //   "Mật khẩu phải dài ít nhất 8 ký tự và có ít nhất một chữ cái và một số"
        // ),
      confirmedPassword: Yup.string()
        .required("Vui lòng xác nhận mật khẩu mới*")
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
    }),
    onSubmit: (value) => {
      dispatch(
        updatePassword({
          userId: user._id,
          currentPassword: value.currentPassword,
          newPassword: value.newPassword
        })
      );
    }
  });
  useEffect(() => {
    if (success) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Đổi mật khẩu thành công!", toastObjects);
      }
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      formik.values.currentPassword = "";
      formik.values.newPassword = "";
      formik.values.confirmedPassword = "";
    }
    if (errorUpdatePassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(errorUpdatePassword, toastObjects);
      }
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, success, errorUpdatePassword]);
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updatePasswordLoading && <Loading />}

      {/* Giao diện */}
      <form className="row form-container ms-4 shadow" onSubmit={formik.handleSubmit}>
        <div className="profile-title">
          <b>Đổi mật khẩu</b>
        </div>
        <div className="user-password">
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-pass__current">Mật khẩu hiện tại</label>
              <input
                id="currentPassword"
                name="currentPassword"
                className="form-control"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* <div className="frame-error">
            {formik.errors.currentPassword && <span className="error-message">{formik.errors.currentPassword}</span>}
          </div> */}
            <div className="frame-error">
                {formik.touched.currentPassword && formik.errors.currentPassword ? (
                  <span className="error-message">{formik.errors.currentPassword}</span>
                ) : null}
            </div>
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-pass__new">Mật khẩu mới</label>
              <input
                id="newPassword"
                name="newPassword"
                className="form-control"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                placeholder="Nhập mật khẩu mới"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* <div className="frame-error">
            {formik.errors.newPassword && <span className="error-message">{formik.errors.newPassword}</span>}
          </div> */}
            <div className="frame-error">
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <span className="error-message">{formik.errors.newPassword}</span>
              ) : null}
            </div>
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-confirm-pass">Xác nhận mật khẩu</label>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                className="form-control"
                type="password"
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
                placeholder="Xác nhận mật khẩu mới"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* <div className="frame-error">
            {formik.errors.confirmedPassword && (
              <span className="error-message">{formik.errors.confirmedPassword}</span>
            )}
          </div> */}
          <div className="frame-error">
              {formik.touched.confirmedPassword && formik.errors.confirmedPassword ? (
                <span className="error-message">{formik.errors.confirmedPassword}</span>
              ) : null}
          </div>
          <button type="submit">Cập nhật</button>
        </div>
      </form>
    </>
  );
};

export default UserPassword;
