import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rating from "../components/product/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview, detailsProduct, listCommentProduct, listProducts } from "../Redux/Actions/productActions";
import Loading from "./../components/base/LoadingError/Loading";
import Message from "./../components/base/LoadingError/Error";
import moment from "moment";
import formatCash from "../utils/formatCash";

import {
  PRODUCT_CREATE_COMMENT_FAIL,
  PRODUCT_CREATE_COMMENT_REPLY_FAIL,
  PRODUCT_CREATE_COMMENT_REPLY_RESET,
  PRODUCT_CREATE_COMMENT_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DELETE_COMMENT_FAIL,
  PRODUCT_DELETE_COMMENT_RESET,
  PRODUCT_DELETE_COMMENT_SUCCESS,
  PRODUCT_UPDATE_COMMENT_FAIL,
  PRODUCT_UPDATE_COMMENT_RESET,
  PRODUCT_UPDATE_COMMENT_SUCCESS
} from "../Redux/Constants/productConstants";
import { addToCartItems, getCartListItem } from "../Redux/Actions/cartActions";
import { ADD_TO_CART_FAIL, ADD_TO_CART_RESET } from "../Redux/Constants/cartConstants";
import ProductComment from "../components/product/ProductComment";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import Slider from "react-slick";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");

  const productSlug = match.params.slug;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const relatedProducts = products?.filter((item) => item.category._id === product?.category);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productReviewCreate;

  const notifiCreateProductComment = useSelector((state) => state.productCreateComment);
  const { success: successCreateComment, error: errorCreateComment } = notifiCreateProductComment;

  const notifiCreateProductCommentReply = useSelector((state) => state.productCreateCommentReply);
  const { success: successCreateCommentReply, error: errorCreateCommentReply } = notifiCreateProductCommentReply;

  const notifiDeleteProductComment = useSelector((state) => state.productDeleteComment);
  const { success: successDeleteComment, error: errorDeleteComment } = notifiDeleteProductComment;

  const notifiUpdateProductComment = useSelector((state) => state.productUpdateComment);
  const { success: successUpdateComment, error: errorUpdateComment } = notifiUpdateProductComment;
  const addToCart = useSelector((state) => state.addToCart);
  const { success: successAddToCart, error: errorAddToCart, loading: loadingAddToCart } = addToCart;
  const loadListCommentProduct = useCallback(() => {
    if (product) {
      dispatch(listCommentProduct(product._id));
    }
  }, [dispatch, product]);

  // handle get single products
  useEffect(() => {
    if (successCreateReview) {
      setReviewContent("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(detailsProduct(productSlug));
    dispatch(listProducts());
  }, [dispatch, productSlug, successCreateReview]);

  // handle show noti create comment
  useEffect(() => {
    if (successCreateComment || successCreateCommentReply) {
      toast.success("Bình luận sản phẩm thành công!", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
      dispatch({ type: PRODUCT_CREATE_COMMENT_REPLY_RESET });
    }
    if (errorCreateComment || errorCreateCommentReply) {
      toast.error(errorCreateComment, ToastObjects);
      dispatch({ type: PRODUCT_CREATE_COMMENT_FAIL });
      dispatch({ type: PRODUCT_CREATE_COMMENT_REPLY_FAIL });
    }
  }, [dispatch, successCreateComment, errorCreateComment, successCreateCommentReply, errorCreateCommentReply]);

  // handle show noti delete comment
  useEffect(() => {
    if (successDeleteComment) {
      toast.success("Xóa bình luận thành công!", ToastObjects);
      loadListCommentProduct();
      dispatch({ type: PRODUCT_DELETE_COMMENT_SUCCESS });
      dispatch({ type: PRODUCT_DELETE_COMMENT_RESET });
    }
    if (errorDeleteComment) {
      toast.error(errorDeleteComment, ToastObjects);
      dispatch({ type: PRODUCT_DELETE_COMMENT_FAIL });
    }
  }, [dispatch, successDeleteComment, errorDeleteComment, loadListCommentProduct]);

  // handle show noti update comment
  useEffect(() => {
    if (successUpdateComment) {
      toast.success("Cập nhật bình luận thành công!", ToastObjects);
      loadListCommentProduct();
      dispatch({ type: PRODUCT_UPDATE_COMMENT_SUCCESS });
      dispatch({ type: PRODUCT_UPDATE_COMMENT_RESET });
    }
    if (errorUpdateComment) {
      toast.error(errorUpdateComment, ToastObjects);
      dispatch({ type: PRODUCT_UPDATE_COMMENT_FAIL });
    }
  }, [dispatch, successUpdateComment, errorUpdateComment, loadListCommentProduct]);

  useEffect(() => {
    if (errorAddToCart) {
      dispatch({ type: ADD_TO_CART_RESET });
      toast.error(errorAddToCart, ToastObjects);
    }
    if (successAddToCart) {
      dispatch(getCartListItem());
      dispatch({ type: ADD_TO_CART_RESET });
      toast.success("Thêm sản phẩm vào giỏ hàng thành công!", ToastObjects);
    }
  }, [dispatch, successAddToCart, errorAddToCart]);
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (userInfo) {
      if (qty > 0) {
        dispatch(addToCartItems(product._id, qty));
      } else {
        dispatch({ type: ADD_TO_CART_FAIL });
      }
    } else {
      history.push("/login");
    }
  };
  const handleBuyNow = (e) => {
    e.preventDefault();
    if (userInfo) {
      if (qty > 0) {
        dispatch(addToCartItems(product._id, qty));
        dispatch({ type: ADD_TO_CART_RESET });
        history.push(`/cart/${product._id}?qty=${qty}`);
      } else {
        dispatch({ type: ADD_TO_CART_FAIL });
      }
    } else {
      history.push("/login");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(product._id, {
        rating,
        reviewContent
      })
    );
  };
  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = "../images/avatar/default.png";
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
          initialSlide: 0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      }
    ]
  };

  return (
    <>
      <Toast />
      <Header />
      <div className="container single-product">
        {loading ? (
          <div className="mb-5 mt-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row bg-w pd-y">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>

                  <div className="product-manuafactures">
                    <div className="product-manuafactures__item">
                      <span>
                        <label>Nhà cung cấp:&nbsp;</label> <b>{product.supplier}</b>
                      </span>
                      <span>
                        <label>Tác giả:&nbsp;</label>
                        <b>{product.author?.length > 22 ? `${product.author.slice(0, 22)}...` : `${product.author}`}</b>
                      </span>
                    </div>
                    <div className="product-manuafactures__item">
                      <span>
                        <label>Nhà xuất bản:&nbsp;</label>
                        <b>{product.publisher}</b>
                      </span>
                      <span>
                        <label>Hình thức bìa:&nbsp;</label> <b>Bìa mềm</b>
                      </span>
                    </div>
                  </div>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Đơn giá</h6>
                      <div>
                        <span className="product-count__new-price">{formatCash(product.priceSale)}</span>
                        <span className="product-count__old-price">{formatCash(product.price)}</span>
                        {product.priceSale < product.price ? (
                          <span className="shoptext__price-special-discount">
                            -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Kho hàng</h6>
                      {product.countInStock > 0 ? (
                        <span>{product.countInStock} sản phẩm</span>
                      ) : (
                        <span className="text-danger fw-bold">Hết hàng</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Đánh giá</h6>
                      <Link href="#review">
                        <Rating
                          value={product.rating}
                          numRating={product.rating}
                          text={`  ${product.numReviews} Đánh giá`}
                        />
                      </Link>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Số lượng</h6>
                      <select
                        value={qty}
                        disabled={!product.countInStock || !product.countInStock > 0 || product.isDisabled}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex justify-content-center">
                      {!product.isDisabled ? (
                        <>
                          <button
                            onClick={handleAddToCart}
                            disabled={!product.countInStock || !product.countInStock > 0 || product.isDisabled}
                            className="btn__add-product round-black-btn"
                          >
                            {loadingAddToCart && <Loading />}
                            <i class="fas fa-cart-plus mx-1" style={{ fontSize: "18px" }}></i>
                            Thêm vào giỏ hàng
                          </button>
                          <button
                            onClick={handleBuyNow}
                            disabled={!product.countInStock || !product.countInStock > 0 || product.isDisabled}
                            className="round-black-btn"
                          >
                            Mua ngay
                          </button>
                        </>
                      ) : (
                        <div className="cart-item-qty-alert py-2 text-danger fw-bold">Sản phẩm đã ngừng bán</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product View Information */}
            <div className="product-view-info">
              <div className="product-view-title pd-y">
                <b>Thông tin chi tiết sản phẩm</b>
              </div>
              <div className="product-view-info_detail">
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Tên nhà cung cấp</label>
                  <div>{product.supplier}</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Tác giả</label>
                  <div>{product.author}</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Năm xuất bản</label>
                  <div>{product.publishingYear}</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Nhà xuất bản</label>
                  <div>{product.publisher}</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Ngôn ngữ</label>
                  <div>Tiếng Việt</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Số trang</label>
                  <div>{product.numberOfPages}</div>
                </div>
                <div className="product-view-info_detail-row">
                  <label className="product-view-info_detail-title">Hình thức</label>
                  <div>Bìa mềm</div>
                </div>
              </div>

              <div className="product-description">
                <div>
                  <b>Mô tả</b>
                </div>
                <div id="summary">
                  <div
                    className="collapse product-description_content"
                    id="collapseSummary"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>
                  <a
                    className="collapsed"
                    data-toggle="collapse"
                    href="#collapseSummary"
                    aria-expanded="false"
                    aria-controls="collapseSummary"
                  ></a>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5 bg-w pd-y" id="review">
              <div className="col-md-6">
                <span className="d-flex align-items-center">
                  <h6 className="mx-1">ĐÁNH GIÁ</h6>
                  <Rating value={product.rating} numRating={product.rating} text={`  ${product.numReviews} Đánh giá`} />
                </span>
                {product.reviews.length === 0 && <Message variant={"alert-info mt-3"}>Chưa có đánh giá nào</Message>}
                {product.reviews &&
                  product.reviews.map((review) => (
                    <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                      <img
                        className="img-xs rounded-circle p-1"
                        src={review.user.avatarUrl}
                        onError={onAvatarLoadError}
                        alt="User avatar"
                      />
                      <strong>{review.user.name}</strong>
                      <Rating value={review.rating} />
                      <span>{moment(review.createdAt).format("DD/MM/yyyy")}</span>
                      {review.reviewContent && (
                        <div className="review-content alert alert-info mt-3">
                          {review.reviewContent}
                          {/* <i class="delete__review text-danger fas fa-trash-alt"></i> */}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="col-md-6">
                <h6>ĐÁNH GIÁ SẢN PHẨM</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && <Message variant="alert-danger">{errorCreateReview}</Message>}
                </div>

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Chất lượng sản phẩm</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-1 rounded"
                      >
                        <option value="1">1 - Tệ</option>
                        <option value="2">2 - Không hài lòng</option>
                        <option value="3">3 - Bình thường</option>
                        <option value="4">4 - Hài lòng</option>
                        <option value="5">5 - Tuyệt vời</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <textarea
                        row="1"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-1 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="btn-submit btn-primary col-12 border-1 p-3 rounded text-white"
                      >
                        Đánh giá
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Vui lòng{" "}
                      <Link to="/login">
                        " <strong>Đăng nhập</strong> "
                      </Link>{" "}
                      để đánh giá{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
            {/* Related products */}
            <div className="ralated-product-list pd-y">
              {relatedProducts?.length > 0 && <h3 className="mb-3 px-3">Sản phẩm tương tự</h3>}
              <div className="col-8 row related-product-container">
                {loading ? (
                  <div className="mb-5 mt-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <Slider {...settings}>
                    {relatedProducts?.map((product) => (
                      <div className="shop col-lg-3 " key={product._id}>
                        <div className="border-product me-3 border border-1">
                          <Link to={`/product/${product.slug}`}>
                            <div className="shopBack main-effect">
                              <img className="main-scale" src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p className="shoptext__name">
                              <Link to={`/products/${product._id}`}>
                                {`${product.name.length} >= 30`
                                  ? `  
                                    ${product.name.slice(0, 30)}...`
                                  : ` ${product.name}}`}
                              </Link>
                            </p>

                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            <div className="shoptext__price">
                              <p className="shoptext__price-special">
                                <span className="shoptext__price-special-new">{formatCash(product.priceSale)}</span>
                                <span className="shoptext__price-special-discount">
                                  -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                                </span>
                              </p>
                              <p className="shoptext__price-old">{formatCash(product.price)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
            {/* Product comment */}

            <ProductComment userInfo={userInfo} match={match} productId={product._id} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
