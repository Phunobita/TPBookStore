import React from "react";
import Header from "../../components/admin/Header";
import { Link } from "react-router-dom";
import ShipperOrderListMain from "../../components/admin/shipper/ShipperOrderListMain";

const ShipperOrderListScreen = () => {
  return (
    <>
      <div className="shipper__order">
        <div className="shipper__order-header">
          <Link className="navbar-brand">
            <img className="img__logo" alt="logo" src="/images/logo.png" />
          </Link>
          <Header />
        </div>
        <ShipperOrderListMain />
      </div>
    </>
  );
};

export default ShipperOrderListScreen;
