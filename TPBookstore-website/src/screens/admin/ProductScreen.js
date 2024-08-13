import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import MainProducts from "./../../components/admin/products/MainProducts";

const ProductScreen = React.memo(({ location }) => {
  window.scrollTo(0, 0);

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const pageNumber = queryParams.get("p") || "";
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts keyword={keyword} pageNumber={pageNumber} />
      </main>
    </>
  );
});

export default ProductScreen;
