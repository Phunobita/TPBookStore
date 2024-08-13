import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import OrderDetailMain from "../../components/admin/orders/OrderDetailMain";

const OrderDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailMain orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
