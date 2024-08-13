import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProductAdmin, hiddenProductAdmin, showProductAdmin } from "../../../Redux/Actions/productActions";
import Rating from "../../product/Rating";
import formatCash from "../../../utils/formatCash";
import Modal from "../../base/modal/Modal";

const Product = (props) => {
  const { products, preIndex } = props;
  const [productIdSelected, setProductIdSelected] = useState("");
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteProductAdmin(productIdSelected));
  };

  const hiddenHandler = () => {
    dispatch(hiddenProductAdmin(productIdSelected));
  };

  const showHandler = () => {
    dispatch(showProductAdmin(productIdSelected));
  };

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [btnTitle, setBtnTitle] = useState("");
  const [btnType, setBtnType] = useState("");
  const [typeAction, setTypeAction] = useState(() => {});

  const typeModal = (type) => {
    if (type === "hiddenProduct") {
      setModalTitle("Xác nhận ẩn sản phẩm");
      setModalBody("Bạn có chắc muốn ẩn sản phẩm này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "showProduct") {
      setModalTitle("Xác nhận bỏ ẩn sản phẩm");
      setModalBody("Bạn có chắc muốn bỏ ẩn  sản phẩm này ?");
      setBtnTitle("Xác nhận");
      setBtnType("confirm");
      setTypeAction(type);
    }

    if (type === "deleteProduct") {
      setModalTitle("Xác nhận xoá sản phẩm");
      setModalBody("Bạn có chắc xoá sản phẩm này ?");
      setBtnTitle("Xoá");
      setBtnType("delete");
      setTypeAction(type);
    }
  };
  return (
    <>
      <Modal
        modalTitle={modalTitle}
        modalBody={modalBody}
        btnTitle={btnTitle}
        btnType={btnType}
        handler={
          typeAction === "showProduct" ? showHandler : typeAction === "hiddenProduct" ? hiddenHandler : deleteHandler
        }
      ></Modal>

      {products?.map((product, index) => (
        <>
          <div className="mobile-header row col-md-12 col-sm-6 col-lg-3 mb-3">
            <div className="row col-md-6 d-flex">
              <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                  <img src={product.image} alt="Product" />
                </Link>
                <div className="row col-12 info-wrap">
                  <div className="col-9">
                    <Link to="#" className="title text-truncate">
                      {product.name}
                    </Link>
                    <div className="price mb-2">${product.price}</div>
                    <Rating value={product.rating} text={`(${product.numReviews})`} />
                  </div>
                  <div className="row col-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="col-12 btn btn-sm btn-outline-success p-2 pb-3 col-md-6 btn-item-product"
                    >
                      <i className="fas fa-pen"></i>
                    </Link>
                    <Link className="text-center" to="#">
                      <i
                        className="text-danger fas fa-trash-alt col-12 btn btn-sm btn-outline-danger p-2 pb-3 col-md-6 btn-item-product"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => {
                          typeModal("showOrder");
                          setProductIdSelected(product._id);
                        }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <tr className="pc-header">
            <td className={product.isDisabled ? `status-disabled` : ``}>{preIndex + index + 1}</td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <img style={{ maxWidth: "70px", minWidth: "70px" }} src={product?.image} alt={product?.name} />
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <b alt={product?.name}>
                {`${product?.name.lenght}>=25` ? `${product?.name.slice(0, 25)}...` : `${product?.name}`}
              </b>
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <Rating value={product.rating} text={`(${product.numReviews})`} />
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <b>{product?.category.name}</b>
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <b>{formatCash(product?.priceSale)}</b>
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <b>{product?.countInStock}</b>
            </td>
            <td className={product.isDisabled ? `status-disabled` : ``}>
              <b>{product?.totalSales}</b>
            </td>
            <td className="text-center">
              <div className="dropdown">
                <div
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-haspopup="true"
                  id="action__product-admin"
                  style={{ opacity: "1" }}
                >
                  <i class="fas fa-ellipsis-h"></i>
                </div>

                <div className="action__product dropdown-menu">
                  {product.isDisabled ? (
                    <Link className="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter">
                      <i
                        class="fas fa-eye-slash"
                        onClick={() => {
                          typeModal("showProduct");
                          setProductIdSelected(product._id);
                        }}
                        style={{ opacity: "1" }}
                      ></i>
                      &nbsp; Bỏ ẩn
                    </Link>
                  ) : (
                    <>
                      <Link className="dropdown-item" to={`/admin/product/${product._id}/edit`}>
                        <i className="fas fa-edit text-warning "></i> &nbsp; Sửa
                      </Link>
                      <Link
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => {
                          typeModal("hiddenProduct");
                          setProductIdSelected(product._id);
                        }}
                        style={{ opacity: "1" }}
                      >
                        <i className="fas fa-eye text-success"></i>
                        &nbsp; Ẩn
                      </Link>
                    </>
                  )}

                  <Link className="dropdown-item">
                    <i
                      class="fas fa-trash-alt edit__products text-danger"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => {
                        typeModal("deleteProduct");
                        setProductIdSelected(product._id);
                      }}
                      style={{ opacity: "1" }}
                    ></i>
                    &nbsp; Xoá
                  </Link>
                </div>
              </div>
            </td>
          </tr>
          {/* ) : (
            <tr className="pc-header">
              <td>{preIndex + index + 1}</td>
              <td>
                <img style={{ maxWidth: "70px", minWidth: "70px" }} src={product?.image} alt={product?.name} />
              </td>
              <td>
                <b alt={product?.name}>
                  {`${product?.name.lenght}>=25` ? `${product?.name.slice(0, 25)}...` : `${product?.name}`}
                </b>
              </td>
              <td>
                <Rating value={product.rating} text={`(${product.numReviews})`} />
              </td>
              <td>
                <b>{product?.category.name}</b>
              </td>
              <td>
                <b>{formatCash(product?.priceSale)}</b>
              </td>
              <td>
                <b>{product?.countInStock}</b>
              </td>
              <td>
                <b>{product?.totalSales}</b>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <div className="text-center">
                    <Link className="text-success">
                      <i className="fas fa-eye" onClick={hiddenHandler}></i>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      className="text-warning p-md-2"
                      to={`/admin/product/${product._id}/edit`}
                      title="Cập nhật"
                      target="_blank"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
                      <i
                        class="fas fa-trash-alt edit__products text-danger"
                        onClick={() => setProductIdDelete(product._id)}
                      ></i>
                    </Link>
                  </div>

                  <div className="dropdown-menu"></div>
                </div>
              </td>
            </tr>
          )} */}
        </>
      ))}
    </>
  );
};

export default Product;
