import React, { useCallback, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Redux/Actions/productActions";
import ShopSection from "../components/homeComponents/ShopSection";
import { listCategory } from "../Redux/Actions/categoryActions";
import ContactInfo from "../components/homeComponents/ContactInfo";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import Slideshow from "../components/Slideshow";
import Footer from "../components/Footer";
import Policy from "./Policy";
import CustomerReview from "../components/homeComponents/CustomerReview";
import BestSellerProduct from "../components/carouselProduct/BestSellerProduct";
import NewProduct from "../components/carouselProduct/NewProduct";

const HomeScreen = ({ location }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  let categoryParent = [];
  category?.map((item) => categoryParent.push(item.parent_category));
  categoryParent = Array.from(new Set(categoryParent));

  const loadData = useCallback(() => {
    dispatch(listProducts());
    dispatch(listCategory());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div>
      <Header />

      <Slideshow />
      <Policy />
      <div className="container">
        <BestSellerProduct />
      </div>
      <div className="container">
        <NewProduct />
      </div>
      <ShopSection loading={loading} error={error} categoryList={categoryParent.slice(0, 4)} products={products} />
      <ShopSection loading={loading} error={error} categoryList={categoryParent.slice(4, 8)} products={products} />
      <CustomerReview />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
