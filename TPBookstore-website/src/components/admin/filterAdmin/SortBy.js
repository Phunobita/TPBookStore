import React from "react";

const SortBy = (props) => {
  const { sortBy, setSortBy } = props;
  return (
    <div className="col-lg-2 col-6 col-md-3">
      <select className="form-select " aria-label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest" id="newest">
          Mới nhất
        </option>
        <option value="latest" id="latest">
          Cũ nhất
        </option>
        <option value="total_sales" id="total_sales">
          Bán chạy
        </option>
        <option value="asc" id="asc">
          Giá từ thấp đến cao
        </option>
        <option value="desc" id="desc">
          Giá từ cao đến thấp
        </option>
      </select>
    </div>
  );
};
export default SortBy;
