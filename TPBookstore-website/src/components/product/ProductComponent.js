import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Message from "./../base/LoadingError/Error";
import CardProductLoading from "../base/LoadingError/CardProductLoading";
import formatCash from "../../utils/formatCash";

const ProductComponent = (props) => {
  const { loading, error, products } = props;
  return (
    <>
      <div className="col-lg-10 col-md-8 col-9 row product-container ">
        {/* {loading && <Loading />} */}
        {loading ? (
          [...Array(12).keys()]?.map((index) => {
            return (
              <div className="col-lg-3" aria-hidden="true" key={index}>
                <div className="shadow p-3 mb-4 bg-body rounded">
                  <CardProductLoading />
                </div>
              </div>
            );
          })
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : !products?.length > 0 ? (
          <div className="not__found px-4">
            <img
              className="not__found-img"
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
            ></img>
            <p className="text-center">Không có sản phẩm nào phù hợp với từ khóa tìm kiếm của bạn</p>
          </div>
        ) : (
          products?.map((product) => (
            <div className="col-lg-3 col-md-6 c-6" key={product._id}>
              <div className="shadow p-3 mb-4 bg-body border border-1 rounded">
                <Link to={`/product/${product.slug}`}>
                  <div className="shopBack main-effect">
                    <img className="main-scale" src={product.image} alt={product.name} />
                  </div>
                </Link>

                <div className="shoptext">
                  <p className="shoptext__name">
                    <Link to={`/product/${product.slug}`}>
                      {product.name.length >= 55 ? `${product.name.slice(0, 55)}...` : ` ${product.name}`}
                    </Link>
                  </p>

                  <Rating value={product.rating} numRating={product.rating} />
                  <div className="shoptext__price">
                    <p className="shoptext__price-special">
                      <span className="shoptext__price-special-new">{formatCash(product.priceSale)}</span>
                      {product.priceSale < product.price ? (
                        <p className="shoptext__price-old mx-1">{formatCash(product.price)}</p>
                      ) : (
                        <></>
                      )}
                      {product.priceSale < product.price ? (
                        <span className="shoptext__price-special-discount">
                          -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>

                {/*Price on Mobile */}
                <div className="shoptext__price__mobile">
                  <p className="shoptext__price-special">
                    <span className="shoptext__price-special-new">{formatCash(product.priceSale)}</span>

                    {product.priceSale < product.price ? (
                      <span className="shoptext__price-special-discount">
                        -{Math.round(100 - (product.priceSale / product.price) * 100)}%
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                  {product.priceSale < product.price ? (
                    <p className="shoptext__price-old mx-1">{formatCash(product.price)}</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductComponent;
