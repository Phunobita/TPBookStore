import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img src="/images/logo.png" className="logo" alt="Ecommerce dashboard template" />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-bars"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin" exact={true}>
                <i className="icon fas fa-home"></i>
                <span className="text">Bảng điều khiển</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/staff" exact={true}>
                <i class="icon fas fa-users"></i>
                <span className="text">Quản lý nhân viên</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/products">
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Sản phẩm</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/addProduct">
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Thêm sản phẩm</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/category">
                <i className="icon fas fa-list"></i>
                <span className="text">Danh mục</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/orders">
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Đơn hàng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/users">
                <i className="icon fas fa-user"></i>
                <span className="text">Khách hàng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/comments">
                <i className="icon fas fa-comments"></i>
                <span className="text">Bình luận</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/admin/slider-banner/">
                <i className="icon fas fa-sliders-h"></i>
                <span className="text">Sliders & Banner</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link disabled" to="/admin/sellers">
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sellers</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link disabled" to="/admin/transaction">
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Transactions</span>
              </NavLink>
            </li> */}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
