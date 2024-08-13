import React from "react";
import isEmpty from "validator/lib/isEmpty";

const PriceFilter = ({
  setMinPriceInput,
  setMaxPriceInput,
  currentMinPrice,
  setCurrentMinPrice,
  currentMaxPrice,
  setCurrentMaxPrice,
  message,
  SetMessage
}) => {
  //xủ lí logic check form
  const checkPrice = () => {
    let msg = "";
    if (
      (isEmpty(currentMinPrice) && isEmpty(currentMaxPrice)) ||
      !(Number(currentMaxPrice) > 0) ||
      Number(currentMinPrice) > Number(currentMaxPrice)
    ) {
      msg = "Vui lòng nhập khoảng giá phù hợp";
      SetMessage(msg);
      return false;
    }
    SetMessage(msg);
    return true;
  };
  const ApplyHandler = () => {
    if (!checkPrice()) return;
    setMinPriceInput(currentMinPrice);
    setMaxPriceInput(currentMaxPrice);
  };
  function validatorPrice(setValue, value) {
    if (/^\d*\.?\d*$/.test(value)) setValue(value);
  }

  return (
    <div className="filter-menu-item">
      <div className="distance-price ms-1">
        <p className="distance-price__p">Khoảng giá</p>
        <div className="distance-price__flex" style={{ display: "flex", alignItems: "center" }}>
          <input
            className="distance-price__input"
            type="text"
            placeholder=" ₫ TỪ"
            value={currentMinPrice}
            onChange={(e) => validatorPrice(setCurrentMinPrice, e.target.value)}
          ></input>
          <label>-</label>
          <input
            className="distance-price__input"
            type="text"
            placeholder=" ₫ ĐẾN"
            value={currentMaxPrice}
            onChange={(e) => validatorPrice(setCurrentMaxPrice, e.target.value)}
          ></input>
        </div>
        <p style={{ fontSize: "14px", color: "red" }}>{message}</p>
        <button className="distance-price__submit" onClick={ApplyHandler}>
          ÁP DỤNG
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
