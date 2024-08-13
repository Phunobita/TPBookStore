import React from "react";
import formatCash from "../../../utils/formatCash";
import { Link } from "react-router-dom";

const TopTotal = (props) => {
  const { orders, totalOrder, totalUser, totalProduct } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) => (order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null));
  }
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng doanh thu</h6> <span>{formatCash(totalSale)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <Link to={"/admin/orders"}>
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-bags-shopping"></i>
              </span>
            </Link>
            <Link to={"/admin/orders"}>
              <div className="text">
                <h6 className="mb-1">Tổng đơn hàng</h6>
                {orders ? <span>{totalOrder ?? 0}</span> : <span>0</span>}
              </div>
            </Link>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <Link to={"/admin/products"}>
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
            </Link>
            <Link to={"/admin/products"}>
              <div className="text">
                <h6 className="mb-1">Tổng sản phẩm</h6>
                <span>{totalProduct ?? 0}</span>
              </div>
            </Link>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <Link to={"/admin/users"}>
              <span className="icon icon-sm rounded-circle alert-primary">
                <i className="text-primary fas fa-user"></i>
              </span>
            </Link>
            <Link to={"/admin/users"}>
              <div className="text">
                <h6 className="mb-1">Tổng Khách hàng</h6>
                <span>{totalUser ?? 0}</span>
              </div>
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
