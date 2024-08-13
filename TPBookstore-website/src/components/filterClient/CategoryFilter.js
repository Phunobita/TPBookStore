import React from "react";

const CategoryFilter = ({ category, categoryFilter, setCategoryFilter }) => {
  return (
    <div className="filter-menu-item ms-1">
      <select
        className="form-select"
        aria-label="Filter by category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">Tất cả danh mục</option>
        {category?.map((itemCategory, index) => (
          <option value={itemCategory.slug} key={index} id={itemCategory._id}>
            {itemCategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
