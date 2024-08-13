import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/base/LoadingError/Error";
import Loading from "../components/base/LoadingError/Loading";
import { verifyEmail } from "../Redux/Actions/userActions";

const RegisterVerify = ({ history, location, match }) => {
  window.scrollTo(0, 0);
  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  const { email, verificationToken } = match.params;
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = () => {
    dispatch(verifyEmail(verificationToken));
  };
  return (
    <>
      <div className="row verified__email">
        {loading && <Loading />}
        {error && <Message variant="alert-danger">{error}</Message>}
        {/* <form className="Login col-md-8 col-lg-4 col-11">  */}
        <div className="verified__email-logo">
          <div className="">
            <Link to="/login">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="">
            <img className="verified__email-img" alt="logo" src="/images/logo.png" />
          </div>
        </div>

        <div className="verified__email-content">
          <h4 className="form-title verified__email-content-title">Xác thực email</h4>
          {verificationToken ? (
            <>
              <h5 className="toEmail">{email?.toString()}</h5>
              <button className="btn btn--primary-color mt-3" onClick={submitHandler}>
                Xác thực
              </button>
            </>
          ) : (
            <div className=" d-flex justify-content-center mt-2">
              Thư xác thực tài khoản đã được gửi đến email &nbsp;
              <a href="https://mail.google.com/">
                <b>{email?.toString()}</b>
              </a>
              , hãy kiểm tra hộp thư của bạn.
            </div>
          )}
        </div>

        {/* </form> */}
      </div>
    </>
  );
};

export default RegisterVerify;
