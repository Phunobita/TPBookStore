import React from "react";

const Limit = (props) => {
  const { limitInput, setLimitInput } = props;

  return (
    <div className="show__product">
      <select
        className="form-select form-select-sort"
        aria-label="Limit"
        value={limitInput}
        onChange={(e) => setLimitInput(e.target.value)}
      >
        <option value="12" id="12">
          12 sản phẩm
        </option>
        <option value="16" id="16">
          16 sản phẩm
        </option>
        <option value="20" id="20">
          20 sản phẩm
        </option>
        <option value="24" id="24">
          24 sản phẩm
        </option>
      </select>
    </div>
  );
};
export default Limit;
