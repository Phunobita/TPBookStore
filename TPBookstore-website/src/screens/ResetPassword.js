import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "../components/base/LoadingError/Error";
import Loading from "../components/base/LoadingError/Loading";
import { userResetPassword } from "../Redux/Actions/userActions";

const ResetPassword = ({ history, location, match }) => {
  window.scrollTo(0, 0);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { resetPasswordToken } = match.params;

  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, success } = resetPassword;
  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [history, success]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmedPassword: ""
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu mới của bạn*")
        .min(8, "Mật khẩu mới phải ít nhất 8 ký tự")
        .max(250, "Mật khẩu mới phải ngắn hơn 250 ký tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Mật khẩu mới phải có ít nhất một chữ cái và một số"
        ),
      confirmedPassword: Yup.string()
        .required("Vui lòng xác nhận mật khẩu mới của bạn*")
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
    }),
    onSubmit: (value) => {
      dispatch(userResetPassword(resetPasswordToken, value.newPassword));
    }
  });

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          <div className="row">
            <Link className="col-2" to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <h5 className="col-10 form-title">Đặt lại mật khẩu</h5>
          </div>

          {/* <div className="frame-error">{error && <Message variant="alert-danger">{error}</Message>}</div> */}
          <div className="frame-error">
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <span className="error-message">{formik.errors.newPassword}</span>
            ) : null}
          </div>

          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Nhập mật khẩu mới"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* <div className="frame-error">
            {formik.errors.newPassword && <span className="error-message">{formik.errors.newPassword}</span>}
          </div> */}
          <input
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            placeholder="Nhập lại mật khẩu"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
          <button type="submit" className="btn">
            Đặt lại
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
