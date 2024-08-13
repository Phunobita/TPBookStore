import React, { useState, useEffect } from "react";
import Toast from "../../base/LoadingError/Toast";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductAdmin, updateProductAdmin } from "./../../../Redux/Actions/productActions";
import { PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } from "../../../Redux/Constants/productConstants";
import { toast } from "react-toastify";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { listCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import ReactQuill from "react-quill";
import UploadImage from "./UploadImage";
import isEmpty from "validator/lib/isEmpty";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const EditProductMain = (props) => {
  const { productId } = props;
  let history = useHistory();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [priceSale, setPriceSale] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [supplier, setSupplier] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [language, setLanguage] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [category, setCategory] = useState("");
  const [validate, setValidate] = useState({});

  const dispatch = useDispatch();

  const productEditAdmin = useSelector((state) => state.productEditAdmin);
  const { loading, error, product } = productEditAdmin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const {
    // loading: loadingCategory,
    // error: errorCategory,
    category: categoryEditProduct
  } = categoryListAdmin;

  useEffect(() => {
    dispatch(listCategoryAdmin());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(editProductAdmin(productId));
      toast.success("Cập nhật sản phẩm thành công!", ToastObjects);
      // history.push("/admin/products");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProductAdmin(productId));
      } else {
        setName(product.name || "");
        setCategory(product.category);
        setDescription(product.description || "");
        setCountInStock(product.countInStock || 0);
        setImage(product.image || "");
        setPrice(product.price || 0);
        setPriceSale(product.priceSale || 0);
        setAuthor(product.author || "");
        setPublisher(product.publisher || "");
        setSupplier(product.supplier || "");
        setPublishingYear(product.publishingYear || "");
        setLanguage(product.language || "");
        setNumberOfPages(product.numberOfPages || 0);
      }
    }
  }, [product, dispatch, productId, successUpdate]);
  useEffect(() => {
    dispatch(editProductAdmin(productId));
  }, [productId]);

  const isEmptyCheckUpdateProduct = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Vui lòng nhập tên sách";
    }

    if (isEmpty(description)) {
      msg.description = "Vui lòng nhập mô tả";
    }

    if (isNaN(countInStock) || countInStock < 0) {
      msg.countInStock = "Vui lòng nhập số hợp lệ";
    }

    if (!image) {
      msg.image = "Vui lòng chọn ảnh";
    }

    if (isEmpty(author)) {
      msg.author = "Vui lòng nhập tên tác giả";
    }

    if (isNaN(price) || price < 0) {
      msg.price = "Vui lòng nhập giá hợp lệ";
    }
    if (isNaN(priceSale) || priceSale < 0) {
      msg.priceSale = "Vui lòng nhập giá hợp lệ";
    }
    if (isEmpty(publisher)) {
      msg.publisher = "Vui lòng nhập nhà xuất bản";
    }

    if (isEmpty(supplier)) {
      msg.supplier = "Vui lòng nhập nhà cung cấp";
    }
    if (isNaN(publishingYear) || publishingYear <= 0) {
      msg.publishingYear = "Vui lòng nhập năm xuất bản";
    }
    if (isEmpty(language)) {
      msg.language = "Vui lòng nhập ngôn ngữ";
    }
    if (isNaN(numberOfPages) || numberOfPages <= 0) {
      msg.numberOfPages = "Vui lòng nhập số hợp lệ";
    }

    if (isEmpty(category)) {
      msg.category = "Vui lòng chọn danh mục";
    }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isEmptyValidate = isEmptyCheckUpdateProduct();
    if (!isEmptyValidate) return;

    if (price >= 0 && countInStock >= 0) {
      const product = new FormData();
      product.append("name", name);
      product.append("price", price);
      product.append("priceSale", priceSale);
      product.append("description", description);
      product.append("author", author);
      product.append("image", JSON.stringify(image));
      product.append("countInStock", countInStock);
      product.append("category", category);
      product.append("publisher", publisher);
      product.append("supplier", supplier);
      product.append("publishingYear", publishingYear);
      product.append("language", language);
      product.append("numberOfPages", numberOfPages);
      dispatch(updateProductAdmin(productId, product));
    } else {
      dispatch({ type: PRODUCT_UPDATE_FAIL });
      toast.error("Cập nhật sản phẩm không thành công!!!", ToastObjects);
    }
  };

  const moudules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"]
    ]
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
  ];

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            {/* <Link to="/admin/products" className="btn btn-danger text-white btn-size"> */}
            <Link to="/admin/products" className="btn ">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            {/* </Link> */}
            <h2 className="content-title">Cập nhật thông tin sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary btn-size">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="row mb-4">
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_title" className="form-label">
                            Tên sách
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập tên sách"
                            className={`form-control ${validate.name?.length > 0 ? "border-red" : ""}`}
                            id="product_title"
                            // required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.name = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.name}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_author" className="form-label">
                            Tác giả
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập Tác giả"
                            className={`form-control ${validate.author?.length > 0 ? "border-red" : ""}`}
                            id="product_author"
                            // required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.author = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.author}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_publisher" className="form-label">
                            Nhà xuất bản
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập Nhà xuất bản"
                            className={`form-control ${validate.publisher?.length > 0 ? "border-red" : ""}`}
                            id="product_publisher"
                            // required
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.publisher = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.publisher}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_supplier" className="form-label">
                            Nhà cung cấp
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập Nhà cung cấp"
                            className={`form-control ${validate.supplier?.length > 0 ? "border-red" : ""}`}
                            id="product_supplier"
                            // required
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.supplier = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.supplier}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_price" className="form-label">
                            Năm xuất bản
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập năm xuất bản"
                            className={`form-control ${validate.publishingYear?.length > 0 ? "border-red" : ""}`}
                            id="product_price"
                            // required
                            value={publishingYear}
                            onChange={(e) => setPublishingYear(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.publishingYear = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.publishingYear}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_price_sale" className="form-label">
                            Số trang
                          </label>
                          <input
                            type="number"
                            placeholder="Nhập số trang"
                            className={`form-control ${validate.numberOfPages?.length > 0 ? "border-red" : ""}`}
                            id="product_price_sale"
                            // required
                            value={numberOfPages}
                            onChange={(e) => setNumberOfPages(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.numberOfPages = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.numberOfPages}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="category_title" className="form-label">
                            Danh mục
                          </label>
                          <select
                            id="category_title"
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Chọn danh mục</option>
                            {categoryEditProduct &&
                              categoryEditProduct.map((category, index) => (
                                <option key={index} value={category._id}>
                                  {category.name}
                                </option>
                              ))}
                          </select>
                          <p className="msg__validate">{validate.category}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_count_in_stock" className="form-label">
                            Số lượng sản phẩm trong kho
                          </label>
                          <input
                            type="number"
                            placeholder="Số lượng"
                            className={`form-control ${validate.countInStock?.length > 0 ? "border-red" : ""}`}
                            id="product_count_in_stock"
                            // required
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.countInStock = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.countInStock}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-3 col-md-6 mb-2">
                          <label htmlFor="product_price" className="form-label">
                            Giá sản phẩm
                          </label>
                          <input
                            type="number"
                            placeholder="0 đ"
                            className={`form-control ${validate.price?.length > 0 ? "border-red" : ""}`}
                            id="product_price"
                            // required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.price = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.price}</p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-2">
                          <label htmlFor="product_price_sale" className="form-label">
                            Giá đã giảm
                          </label>
                          <input
                            type="number"
                            placeholder="0 đ"
                            className={`form-control ${validate.priceSale?.length > 0 ? "border-red" : ""}`}
                            id="product_price_sale"
                            // required
                            value={priceSale}
                            onChange={(e) => setPriceSale(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.priceSale = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.priceSale}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-2">
                          <label htmlFor="product_author" className="form-label">
                            Ngôn ngữ
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập ngôn ngữ"
                            className={`form-control ${validate.language?.length > 0 ? "border-red" : ""}`}
                            id="product_author"
                            // required
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            onClick={() => {
                              setValidate((values) => {
                                const x = { ...values };
                                x.language = "";
                                return x;
                              });
                            }}
                          />
                          <p className="msg__validate">{validate.language}</p>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label className="form-label">Mô tả</label>
                        <ReactQuill
                          placeholder="Nhập mô tả sản phẩm"
                          className="form-control text-align-content input-description"
                          moudules={moudules}
                          formats={formats}
                          required
                          value={description}
                          onChange={(value) => setDescription(value)}
                        />
                        <div className="col-lg-12 col-md-7 mt-4">
                          <label className="form-label">Hình ảnh sản phẩm</label>
                          <UploadImage image={image} setImage={(value) => setImage(value)} />
                        </div>
                        <p className="msg__validate">{validate.image}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
