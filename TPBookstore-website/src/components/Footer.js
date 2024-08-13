import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // hanlde set show icon footer

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <footer className="footer">
        <div className="footer__information">
          <div className="grid wide">
            <div className="row">
              <div className="col l-2-4 m-6 c-12">
                <div className="footer__infomation-contact">
                  {/* <h3 className="footer__infomation--contact-heading">CONTACT</h3> */}
                  <div className="footer__infomation-contact-heading">
                    <Link className="footer__infomation--contact-logo" to="/">
                      <img alt="logo" src="/images/logo.png" />
                    </Link>
                  </div>
                  <ul className="footer__infomation--contact-list">
                    {/* <li className="footer__infomation--contact-name">TP Bookstore</li> */}
                    <li className="footer__infomation--contact-address">Địa chỉ: Q12, Ho Chi Minh City</li>
                    <li className="footer__infomation--contact-email">Email:tpbookstore2022@gmail.com</li>
                    <li className="footer__infomation--contact-phone">SĐT: +0909 0009</li>
                    <div className="gird">
                      <div className="row no-gutters">
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-1.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-2.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-3.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-4.png" alt="" />
                        </div>
                      </div>
                    </div>
                    {/* </li> */}
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">KÊNH BÁN HÀNG</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Shopee
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sendo
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Zalo
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Lazada
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Tiki
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">THÔNG TIN</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sách mới nhất
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Khuyến mãi
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Hướng dẫn đặt hàng
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Tin tức
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">CHÍNH SÁCH BẢO MẬT</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Chính sách bán hàng
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Chính sách đổi trả
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Chính sách giao hàng
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Chính sách tuyển dụng
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Chính sách bảo hành
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">SẢN PHẨM</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sản phẩm nổi bật
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sản phẩm mới
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sản phẩm mới 2022
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Bán sản phẩm
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sản phẩm khuyến mãi
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="footer__copyright">Copyright 2022 © | TP Bookstore</p>
          </div>
        </div>
      </footer>

      {/* icon footer left */}
      <div className="icon__footer" style={{ display: visible ? "inline" : "none" }}>
        <div class="icon__footer-left">
          <div class="icon__footer-social">
            <div class="icon__footer-social--list hidden-mobile">
              <li class="icon__footer-social--item">
                <a target="_blank" rel="noopener noreferrer" class="icon__footer-social-link">
                  <i class="icon-footer fab fa-facebook"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a target="_blank" rel="noopener noreferrer" class="icon__footer-social-link">
                  <i class="icon-footer fab fa-facebook-messenger"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a target="_blank" rel="noopener noreferrer" class="icon__footer-social-link">
                  <i class="icon-footer fab fa-instagram"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a target="_blank" rel="noopener noreferrer" class="icon__footer-social-link">
                  <i class="icon-footer fas fa-phone"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a target="_blank" rel="noopener noreferrer" class="icon__footer-social-link">
                  <i class="icon-footer fab fa-twitter"></i>
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
      {/* Arrow circle */}
      <Link to="#" className="active-top" style={{ display: visible ? "inline" : "none" }}>
        <i className="fas fa-arrow-circle-up"></i>
      </Link>
    </>
  );
};

export default Footer;
