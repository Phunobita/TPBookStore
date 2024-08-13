import React from "react";

const SortBy = (props) => {
  const { sortBy, setSortBy } = props;
  return (
    <div className="sort__product">
      <span className="sort__product-title">Sắp xếp theo</span>
      <select
        className="form-select form-select-sort"
        aria-label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="total_sales" id="total_sales">
          Bán chạy
        </option>
        <option value="asc" id="asc">
          Giá từ thấp đến cao
        </option>
        <option value="desc" id="desc">
          Giá từ cao đến thấp
        </option>
        <option value="newest" id="newest">
          Mới nhất
        </option>
        <option value="latest" id="latest">
          Cũ nhất
        </option>
      </select>
    </div>
  );
};
export default SortBy;
