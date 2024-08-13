import React from "react";
import Header from "../components/Header";
import ProductList from "../components/product/ProductList";
import Footer from "../components/Footer";

const ProductsScreen = ({ location, match }) => {
  window.scrollTo(0, 0);
  const categorySlug = match.params.category ?? "";
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  const limit = queryParams.get("limit") || "";

  return (
    <div>
      <Header categorySlug={categorySlug} />
      <ProductList categorySlug={categorySlug} keyword={keyword} pageNumber={page} limit={limit} />
      <Footer />
    </div>
  );
};

export default ProductsScreen;
