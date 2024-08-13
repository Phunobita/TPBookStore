import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../components/base/LoadingError/Loading";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import { forGotPassWord } from "../Redux/Actions/userActions";
import { USER_FORGOT_PASSWORD_RESET } from "../Redux/Constants/userConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000
};
const ForgotPassword = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.userForgotPassword);
  const { error: errorForgot, loading: loadingForgot, success: successForgot } = forgotPassword;

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Giá trị bắt buộc*")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập một địa chỉ email hợp lệ")
    }),
    onSubmit: (value) => {
      dispatch(forGotPassWord(value.email));
    }
  });
  useEffect(() => {
    if (successForgot) {
      toast.success("Yêu cầu đã được gửi đi, hãy kiểm tra hộp thư email của bạn!", ToastObjects);
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
      formik.values.email = "";
    }
    if (errorForgot) {
      toast.error(errorForgot, ToastObjects);
    }
  }, [dispatch, errorForgot, successForgot]);
  return (
    <>
      <Toast />
      <div className="forgot-password-header col-12 d-flex align-items-center">
        <Link className="navbar-brand" to="/">
          <img alt="logo" src="/images/logo.png" />
        </Link>
        <h6>Bạn cần giúp đỡ ?</h6>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loadingForgot && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          <div className="row forgot-password-title">
            <Link className="col-2" to="/login">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <h5 className="col-10 form-title">Đặt lại mật khẩu</h5>
          </div>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="frame-error">
            {formik.errors.email && <span className="error-message">{formik.errors.email}</span>}
          </div>

          <button type="submit">Gửi Yêu cầu</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
