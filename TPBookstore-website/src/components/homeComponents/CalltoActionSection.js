import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="grid wide">
      <div className="subscribe-section bg-with-black">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="subscribe-head">
                <h2>Đăng ký nhận Thông báo</h2>
                <p>Đăng ký nhận thông tin sách mới, sách giảm giá</p>
                <form className="form-section">
                  <input
                    placeholder="Email của bạn..."
                    name="email"
                    type="email"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                  <input value="Đăng ký" name="subscribe" type="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
