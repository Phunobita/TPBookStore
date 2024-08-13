import React, { useState } from "react";
import CategoryFilter from "../components/filterClient/CategoryFilter";
import PriceFilter from "../components/filterClient/PriceFilter";
import RatingFilter from "../components/filterClient/RatingFilter";
import { Link } from "react-router-dom";

const Filter = (props) => {
  const {
    category,
    categoryFilter,
    setCategoryFilter,
    ratingFilter,
    setRatingFilter,
    setMinPriceInput,
    setMaxPriceInput
  } = props;

  const [currentMinPrice, setCurrentMinPrice] = useState("");
  const [currentMaxPrice, setCurrentMaxPrice] = useState("");
  const [message, SetMessage] = useState("");
  const ClearHandle = () => {
    setCategoryFilter("");
    setRatingFilter("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setCurrentMinPrice("");
    setCurrentMaxPrice("");
    SetMessage("");
  };
  return (
    <>
      <div className="filter-menu">
        <div>
          <h4 className="filter-menu__title">DANH MỤC</h4>
        </div>
        <CategoryFilter category={category} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        <div>
          <h4 className="filter-menu__title">BỘ LỌC TÌM KIẾM</h4>
        </div>
        <PriceFilter
          setMinPriceInput={setMinPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          currentMaxPrice={currentMaxPrice}
          setCurrentMaxPrice={setCurrentMaxPrice}
          currentMinPrice={currentMinPrice}
          setCurrentMinPrice={setCurrentMinPrice}
          message={message}
          SetMessage={SetMessage}
        />
        <RatingFilter ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
      </div>
      <div className="" display={{ display: "flex", alignItems: "center" }}>
        <button className="distance-price__submit">
          <Link
            className="navbar-brand"
            to="/products"
            onClick={ClearHandle}
            style={{ fontSize: "0.85rem", color: "#fff" }}
          >
            XÓA TẤT CẢ
          </Link>
        </button>
      </div>
    </>
  );
};

export default Filter;
