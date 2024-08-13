import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../product/Rating";
import Message from "./../base/LoadingError/Error";
import CardProductLoading from "../base/LoadingError/CardProductLoading";
import formatCash from "../../utils/formatCash";
import Loading from "../base/LoadingError/Loading";

const ShopSection = (props) => {
  const { loading, error, categoryList, products } = props;
  const [categorySelected, setCategorySelected] = useState(categoryList[0]);
  const [activeId, setActiveId] = useState(categoryList[0]);
  if (categoryList.length > 0) {
    if (!categorySelected) {
      setCategorySelected(categoryList[0]);
    }
    if (!activeId) {
      setActiveId(categoryList[0]);
    }
  }
  let productList = [];
  if (products?.length > 0) {
    products.map((item) => {
      if (item.category.parent_category === categorySelected) productList.push(item);
      return productList;
    });
    productList = productList.slice(0, 10);
  }

  return (
    <>
      <div className="container all-products">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer">
                {/* list category */}
                <ul className="list__category">
                  {categoryList?.map((item) => (
                    <div className="list__category-item">
                      <li
                        className={activeId === item ? "list__category-name active" : "list__category-name inactive"}
                        onClick={() => {
                          setActiveId(item);
                          setCategorySelected(item);
                        }}
                      >
                        {item}
                      </li>
                    </div>
                  ))}
                </ul>

                {/* Show products */}
                <div className="row justify-content-center mx-0 col-lg-12 col-md-12 col-12">
                  {/* Show all products */}
                  <div className="col-lg-12 col-md-12 col-9 row product-container ">
                    {loading && <Loading />}
                    {loading ? (
                      [...Array(10).keys()]?.map((index) => {
                        return (
                          <div className="l-2-4" aria-hidden="true" key={index}>
                            <div className="shadow p-3 mb-4 bg-body rounded">
                              <CardProductLoading />
                            </div>
                          </div>
                        );
                      })
                    ) : error ? (
                      <Message variant="alert-danger">{error}</Message>
                    ) : (
                      productList?.map((product) =>
                        product.category.parent_category === categorySelected ? (
                          <div className="l-2-4 col-md-6 c-6" key={product._id}>
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
                                {/* Price PC */}
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

                                {/* Price Mobile */}
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
                          </div>
                        ) : (
                          <></>
                        )
                      )
                    )}
                  </div>
                </div>
                <div className="show__product-more ">
                  <Link to="/products">
                    <button className="show__product-more-btn" type="button">
                      Xem thêm
                    </button>
                  </Link>
                </div>

                {/* Pagination */}
                {/* <Pagination page={page} pages={pages} keyword={keyword ? keyword : ""} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
