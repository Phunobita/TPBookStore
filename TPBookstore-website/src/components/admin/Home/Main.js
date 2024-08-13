import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAdmin } from "../../../Redux/Actions/productActions";
import { listUser } from "../../../Redux/Actions/userActions";
import { listOrders } from "../../../Redux/Actions/orderActions";

const Main = () => {
  const dispatch = useDispatch();

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders, total: totalOrder } = orderListAdmin;
  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { total: totalProduct } = productListAdmin;
  const userList = useSelector((state) => state.userList);
  const { total: totalUser } = userList;

  useEffect(() => {
    dispatch(listProductsAdmin());
    dispatch(listOrders());
    dispatch(listUser());
  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Bảng điều khiển </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} totalOrder={totalOrder} totalProduct={totalProduct} totalUser={totalUser} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
