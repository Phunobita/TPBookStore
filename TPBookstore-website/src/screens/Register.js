import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "../components/base/LoadingError/Error";
import Loading from "../components/base/LoadingError/Loading";
import Header from "../components/Header";
import { userRegisterAction } from "../Redux/Actions/userActions";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmedPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Vui lòng nhập họ tên họ tên của bạn*")
        .min(4, "Họ tên phải dài hơn 3 ký tụ")
        .max(250, "Họ tên phải ngắn hơn 250 ký tự"),
      email: Yup.string().required("Vui lòng nhập email của bạn*").email("Vui lòng nhập một địa chỉ email hợp lệ"),
      phone: Yup.string()
        .required("Vui lòng nhập số điện thoại của bạn*")
        .matches(
          /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
          "Vui lòng nhập một số điện thoại hợp lệ"
        ),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu của bạn*")
        .min(8, "Mật khẩu phải dài ít nhất 8 ký tự")
        .max(250, "Mật khẩu phải ngắn hơn 250 ký tự")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật khẩu phải có ít nhất một chữ cái và một số"),
      confirmedPassword: Yup.string()
        .required("Vui lòng xác nhận mật khẩu của bạn*")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    }),
    onSubmit: (value) => {
      dispatch(userRegisterAction(history, value.name, value.email, value.phone, value.password));
    }
  });
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          <h5 className="form-title">Đăng ký</h5>
          <div className="frame-error">{error && <Message variant="alert-danger">{error}</Message>}</div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Họ tên"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="frame-error">
            {/* {formik.errors.name && <span className="error-message">{formik.errors.name}</span>} */}
            {formik.touched.name && formik.errors.name ? (
              <span className="error-message">{formik.errors.name}</span>
            ) : null}
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="frame-error">
            {/* {formik.errors.email && <span className="error-message">{formik.errors.email}</span>} */}
            {formik.touched.email && formik.errors.email ? (
              <span className="error-message">{formik.errors.email}</span>
            ) : null}
          </div>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Số điện thoại"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="frame-error">
            {/* {formik.errors.phone && <span className="error-message">{formik.errors.phone}</span>} */}
            {formik.touched.phone && formik.errors.phone ? (
              <span className="error-message">{formik.errors.phone}</span>
            ) : null}
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mật khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="frame-error">
            {/* {formik.errors.password && <span className="error-message">{formik.errors.password}</span>} */}
            {formik.touched.password && formik.errors.password ? (
              <span className="error-message">{formik.errors.password}</span>
            ) : null}
          </div>
          <input
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            placeholder="Nhập lại mật khẩu"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="frame-error">
            {/* {formik.errors.confirmedPassword && (
              <span className="error-message">{formik.errors.confirmedPassword}</span>
            )} */}
            {formik.touched.confirmedPassword && formik.errors.confirmedPassword ? (
              <span className="error-message">{formik.errors.confirmedPassword}</span>
            ) : null}
          </div>
          <button type="submit" className="btn">
            Đăng ký
          </button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Tôi đã có tài khoản? <strong>Đăng nhập</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
