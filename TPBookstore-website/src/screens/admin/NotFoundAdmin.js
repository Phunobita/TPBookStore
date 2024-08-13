import React from "react";
import { Link } from "react-router-dom";

const NotFoundAdmin = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Không thể tìm thấy trang bạn yêu cầu</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/bank/notFound.png"
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn--primary-color mt-5">
            <Link to="/admin" className="text-white text-decoration-none">
              Trở về trang chủ
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundAdmin;
