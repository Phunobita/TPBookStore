import React, { useEffect, useState } from "react";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { adminAddStaffAction } from "././../../../Redux/Actions/userActions";
import { toast } from "react-toastify";
import Toast from "../../base/LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CreateUser = () => {
  const addStaff = useSelector((state) => state.addStaff);
  const { loading, error, success } = addStaff;

  const dispatch = useDispatch();

  const [checkSuccess, setCheckSuccess] = useState("false");

  // lấy dữ liệu từ radio button để xác nhân vai trò
  const getRoleValue = () => {
    var radioSex = document.getElementsByName("user-role");
    for (var i = 0; i < radioSex.length; i++) {
      if (radioSex[i].checked === true) {
        return radioSex[i].value;
      }
    }
  };
  useEffect(() => {
    if (checkSuccess === "true") {
      toast.success("Thêm nhân viên thành công, vui lòng kiểm tra email và xác thực tài khoản!", ToastObjects);
      setCheckSuccess("false");
    }
  }, [dispatch, checkSuccess]);
  // useEffect(() => {
  //   if (success) {
  //     toast.success("Thêm nhân viên thành công, vui lòng kiểm tra email và xác thực tài khoản!", ToastObjects);
  //   }
  // }, [dispatch, success]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: "staff",
      password: "",
      confirmedPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Giá trị bắt buộc*")
        .min(4, "Họ tên phải dài hơn 3 ký tụ")
        .max(250, "Họ tên phải ngắn hơn 250 ký tự"),
      email: Yup.string().required("Giá trị bắt buộc*").email("Vui lòng nhập một địa chỉ email hợp lệ"),
      phone: Yup.string()
        .required("Giá trị bắt buộc*")
        .matches(
          /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
          "Vui lòng nhập một số điện thoại hợp lệ"
        ),
      role: Yup.string().required("Giá trị bắt buộc*"),
      password: Yup.string()
        .required("Giá trị bắt buộc*")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Mật khẩu phải dài ít nhất 8 ký tự và có ít nhất một chữ cái và một số"
        ),
      confirmedPassword: Yup.string()
        .required("Giá trị bắt buộc*")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    }),
    onSubmit: (value) => {
      value.role = getRoleValue();
      dispatch(adminAddStaffAction(value.name, value.email, value.phone, value.role, value.password));
      handleResetData(value);
      setCheckSuccess("true");
    }
  });
  const handleResetData = (v) => {
    v.name = "";
    v.email = "";
    v.phone = "";
    v.password = "";
    v.confirmedPassword = "";
  };
  return (
    <>
      <Toast />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {/* {loading && <Loading />} */}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          <div className="text-start">
            <div className="frame-error">{error && <Message variant="alert-danger">{error}</Message>}</div>
            <h5>Vai trò</h5>
            <div className="d-flex align-items-center my-3">
              <span className="user__role">
                <input className="input__role" id="staff" defaultChecked type="radio" name="user-role" value="staff" />
                <label for="staff" className="input__role-title">
                  Nhân viên bán hàng
                </label>
              </span>
              <span className="user__role">
                <input className="input__role" id="shipper" type="radio" name="user-role" value="shipper" />
                <label for="shipper" className="input__role-title">
                  Nhân viên giao hàng
                </label>
              </span>
            </div>
          </div>
          <div className="frame-error">
            {formik.touched.role && formik.errors.role ? (
              <span className="error-message">{formik.errors.role}</span>
            ) : null}
          </div>
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
            TẠO TÀI KHOẢN
          </button>
          <p></p>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
