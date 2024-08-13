import React from "react";
import Header from "../../components/admin/Header";
import { Link } from "react-router-dom";
import ShipperOrderDetails from "../../components/admin/shipper/ShipperOrderDetails";

const ShipperOrderDetailsScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <div className="shipper__order">
        <div className="shipper__order-header">
          <Link className="navbar-brand" to="/">
            <img className="img__logo" alt="logo" src="/images/logo.png" />
          </Link>
          <Header />
        </div>
        <ShipperOrderDetails orderId={orderId} />
      </div>
    </>
  );
};

export default ShipperOrderDetailsScreen;
