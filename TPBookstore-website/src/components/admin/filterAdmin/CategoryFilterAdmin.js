import React from "react";

const CategoryFilterAdmin = ({ category, categoryFilterAdmin, setCategoryFilterAdmin }) => {
  return (
    <div className="col-lg-2 col-6 col-md-3" style={{ marginLeft: "72px", marginRight: "8px" }}>
      <select
        className="form-select"
        value={categoryFilterAdmin}
        onChange={(e) => setCategoryFilterAdmin(e.target.value)}
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

export default CategoryFilterAdmin;
