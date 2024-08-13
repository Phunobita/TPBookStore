import React from "react";
import Rating from "../product/Rating.js";
const RatingFilter = ({ ratingFilter, setRatingFilter }) => {
  return (
    <div className="filter-menu-item">
      <div className="ms-1 assess-star">
        <p className="distance-price__p">Đánh giá</p>
        <div className="assess-star__div">
          <div display={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              style={{ display: "none" }}
              className="star-none"
              name="star"
              id="five"
              value={"5"}
              onClick={(e) => {
                setRatingFilter(e.target.value);
              }}
            ></input>
            <label for="five" className={ratingFilter === "5" ? "rating-color" : " "}>
              <Rating value="5"></Rating>
            </label>
          </div>
          <div display={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              style={{ display: "none" }}
              className="star-none"
              name="star"
              id="four"
              value={"4"}
              onClick={(e) => {
                setRatingFilter(e.target.value);
              }}
            ></input>
            <label for="four" className={ratingFilter === "4" ? "rating-color" : " "}>
              <Rating value="4" text={" trở lên"}></Rating>
            </label>
          </div>
          <div display={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              style={{ display: "none" }}
              className="star-none"
              name="star"
              id="three"
              value={"3"}
              onClick={(e) => {
                setRatingFilter(e.target.value);
              }}
            ></input>
            <label for="three" className={ratingFilter === "3" ? "rating-color" : " "}>
              <Rating value="3" text={" trở lên"}></Rating>
            </label>
          </div>
          <div display={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              style={{ display: "none" }}
              className="star-none"
              name="star"
              id="two"
              value={"2"}
              onClick={(e) => {
                setRatingFilter(e.target.value);
              }}
            ></input>
            <label for="two" className={ratingFilter === "2" ? "rating-color" : " "}>
              <Rating value="2" text={" trở lên"}></Rating>
            </label>
          </div>
          <div display={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              style={{ display: "none" }}
              className="star-none"
              name="star"
              id="one"
              value={"1"}
              onClick={(e) => {
                setRatingFilter(e.target.value);
              }}
            ></input>
            <label for="one" className={ratingFilter === "1" ? "rating-color" : ""}>
              <Rating value="1" text={" trở lên"}></Rating>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
