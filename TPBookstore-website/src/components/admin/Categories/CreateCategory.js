import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../../../Redux/Constants/categoryConstants.js";
import Loading from "../../base/LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [parent_category, setParent_category] = useState("");
  const dispatch = useDispatch();

  const categoryCreateAdmin = useSelector((state) => state.categoryCreateAdmin);
  const { loading, error, success } = categoryCreateAdmin;

  useEffect(() => {
    if (success) {
      toast.success("Thêm danh mục thành công!", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setParent_category("");
    }
    if (error) {
      toast.error(error, ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
    }
  }, [success, dispatch, loading, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategoryAdmin({ name, parent_category }));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        {/* {error && <Message variant="alert-danger">{error}</Message>} */}
        {loading && <Loading />}
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Tên danh mục
          </label>
          <input
            required
            type="text"
            placeholder="Nhập danh mục"
            className="form-control"
            id="category_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Danh mục cha
          </label>
          <input
            required
            type="text"
            placeholder="Nhập danh mục cha"
            className="form-control"
            id="category_name"
            value={parent_category}
            onChange={(e) => setParent_category(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-size btn-primary">Thêm danh mục</button>
        </div>
      </form>
    </>
  );
};

export default CreateCategory;
