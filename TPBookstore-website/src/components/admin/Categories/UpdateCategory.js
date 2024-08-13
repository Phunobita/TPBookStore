import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import Loading from "../../base/LoadingError/Loading";
import Modal from "../../base/modal/Modal";

const UpdateCategory = ({ currentCategory, setIsEditCategory }) => {
  const [name, setName] = useState("");
  const [parent_category, setParent_category] = useState("");

  const dispatch = useDispatch();

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const { category } = categoryListAdmin;

  const categoryUpdateAdmin = useSelector((state) => state.categoryUpdateAdmin);
  const { loading } = categoryUpdateAdmin;

  const updateCategoryHandler = useCallback(() => {
    setName(category[currentCategory]?.name ?? "");
    setParent_category(category[currentCategory]?.parent_category ?? "");
  }, [category, currentCategory]);

  useEffect(() => {
    updateCategoryHandler();
  }, [updateCategoryHandler]);

  const submitHandler = () => {
    dispatch(
      updateCategoryAdmin({
        _id: category[currentCategory]?._id,
        name,
        parent_category,
        status: true
      })
    );
  };

  return (
    <>
      <div className="">
        <div>
          {loading && <Loading />}
          <div className="d-flex justify-content-between">
            <div className="mb-3 w-100">
              <label htmlFor="category_name" className="form-label">
                Tên danh mục
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control"
                id="category_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-3 w-100">
              <label htmlFor="parent-category" className="form-label">
                Danh mục cha
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control"
                id="parent-category"
                value={parent_category}
                onChange={(e) => setParent_category(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger px-4" onClick={() => setIsEditCategory(false)}>
              Hủy
            </button>
            <button type="button" className="btn btn-warning px-4" onClick={submitHandler}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
