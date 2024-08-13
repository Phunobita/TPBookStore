import React from "react";

const ContactInfo = () => {
  return (
    <div className=" grid wide">
      <div className="contactInfo">
        <div className="row">
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h5>Gọi cho chúng tôi 24x7</h5>
              <p>+0909 0009</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h5>Cửa hàng chính</h5>
              <p>Ho Chi Minh</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-fax"></i>
              </div>
              <h5>Fax</h5>
              <p>+0909 0009</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
