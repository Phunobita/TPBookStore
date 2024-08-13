import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCartListItem } from "../Redux/Actions/cartActions";
import { logout } from "../Redux/Actions/userActions";
import { listBanner } from "../Redux/Actions/bannerActions";
import CategoryList from "./homeComponents/CategoryList";

const Header = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { categorySlug = "" } = props;
  const [keyword, setKeyword] = useState("");
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bannerList = useSelector((state) => state.bannerList);
  const { banners } = bannerList;

  useEffect(() => {
    if (userLogin) {
      dispatch(getCartListItem());
    }
    if (!banners) {
      dispatch(listBanner());
    }
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // search handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      if (categorySlug) {
        history.push(`/search/category/${categorySlug}?q=${keyword}`);
      } else {
        history.push(`/search?q=${keyword}`);
      }
    } else {
      history.push("/");
    }
  };

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        {banners?.length > 0 ? (
          <Link to={banners[0].linkTo}>
            <img src={banners[0].image} alt={banners[0].name} className="banner__header" />
          </Link>
        ) : (
          <img alt="Banner" src="" className="banner__header" />
        )}
      </div>

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* Toggle menu */}
          {/* <Sidebar /> */}

          {/* MOBILE HEADER */}
          <div className="mobile-header mb-3">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <i
                        className="fa fa-user name-button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-hidden="true"
                      ></i>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Tài khoản
                        </Link>
                        {userInfo?.role === "admin" && (
                          <Link className="dropdown-item" to="/admin">
                            Trang Quản trị
                          </Link>
                        )}
                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <div className="d-flex">
                        <Link className="px-2" to="/login">
                          Đăng nhập
                        </Link>

                        <Link className="px-2" to="/register">
                          Đăng ký
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i class="fas fa-shopping-cart" style={{ color: "#4AC4FA", fontSize: "16px" }}></i>
                    <span className="badge">{cartItems?.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <CategoryList />
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      <i class="far fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>

              <div className="col-md-6 col-4 d-flex align-items-center">
                <CategoryList />

                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    <i class="far fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <Link to="/profile">
                      <img
                        className="img-xs rounded-circle"
                        src={userInfo?.avatarUrl}
                        onError={onAvatarLoadError}
                        alt="User avatar"
                      />
                    </Link>
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo?.name?.length >= 15 ? `${userInfo?.name?.slice(0, 15)}` : `${userInfo?.name}`}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Tài khoản
                      </Link>
                      {userInfo?.role === "admin" && (
                        <Link className="dropdown-item" to="/admin">
                          Trang Quản trị
                        </Link>
                      )}
                      <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <button className="name-button">
                      <Link to="/register">Đăng ký</Link>
                    </button>

                    <button className="name-button">
                      <Link to="/login">Đăng nhập</Link>
                    </button>
                  </>
                )}

                <Link to="/cart">
                  <i class="fas fa-shopping-cart" style={{ color: "#4AC4FA", fontSize: "20px" }}></i>
                  <span className="badge">{cartItems?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
