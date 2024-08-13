import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import OrderMain from "./../../components/admin/orders/OrderMain";

const OrderScreen = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain keyword={keyword} pageNumber={page} />
      </main>
    </>
  );
};

export default OrderScreen;
