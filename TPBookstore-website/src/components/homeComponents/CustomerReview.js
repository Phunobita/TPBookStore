import React from "react";
import { useSelector } from "react-redux";

const CustomerReview = () => {
  const getReviewCustomer = useSelector((state) => state.productList);
  const { products } = getReviewCustomer;

  //   const newProduct = products
  //     ?.sort((a, b) => b.numReviews - a.numReviews)
  //     .slice(0, 3)
  //     .map((item) => {
  //       return item.reviews.sort((a, b) => b.rating - a.rating);
  //     });
  const newProduct = products
    ?.filter((item) => item.rating >= 4)
    ?.map((item) => {
      return item.reviews.sort((a, b) => b.rating - a.rating);
    });

  return (
    <div className="grid wide">
      <div className="evaluate">
        <div className="evaluate__title">
          <h2 className="evaluate__heading">Đánh giá khách hàng nổi bật</h2>
        </div>
        <div className="evaluate__overlay"></div>
        <div className="grid wide">
          <div className="row evaluate__container">
            <div className="col l-3 m-6 d-flex justify-content-center">
              <div className="evaluate__user">
                <div className="evaluate__user-img">
                  <img src="./images/avatar/avartar_user_1.jpg" alt="" />
                </div>
                <div className="evaluate__content">
                  <div className="evaluate__content-icon">
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                  </div>
                  <h3 className="evaluate__content--name">Nguyễn Khắc Tuấn</h3>
                  <p className="evaluate__content--desc">
                    {newProduct
                      ? newProduct[2]?.[0]?.reviewContent
                      : `There are many meaningful books here and their prices are also very reasonable.`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col l-3 m-6 d-flex justify-content-center">
              <div className="evaluate__user">
                <div className="evaluate__user-img">
                  <img src="./images/avatar/avartar_user_2.jpg" alt="" />
                </div>
                <div className="evaluate__content">
                  <div className="evaluate__content-icon">
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                  </div>
                  <h3 className="evaluate__content--name">Nguyễn Viết Phú</h3>
                  <p className="evaluate__content--desc">
                    {/* {newProduct
                      ? newProduct[1]?.[0]?.reviewContent
                      : `There are many meaningful books here and their prices are also very reasonable`} */}
                    Với cá nhân mình,cảm thấy sách rất thú vị, thu lượm được nhiều tri thức.
                  </p>
                </div>
              </div>
            </div>
            <div className="col l-3 m-6 d-flex justify-content-center">
              <div className="evaluate__user">
                <div className="evaluate__user-img">
                  <img src="./images/avatar/avatar_user_3.jpg" alt="" />
                </div>
                <div className="evaluate__content">
                  <div className="evaluate__content-icon">
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                  </div>
                  <h3 className="evaluate__content--name">Nguyễn Anh Tuấn</h3>
                  <p className="evaluate__content--desc">
                    {/* {newProduct
                      ? newProduct[3]?.[0]?.reviewContent
                      : `There are many meaningful books here and their prices are also very reasonable`} */}
                    Đây là một quyển sách rất hay, truyền tải nội dung sâu sắc
                  </p>
                </div>
              </div>
            </div>
            <div className="col l-3 m-6 d-flex justify-content-center">
              <div className="evaluate__user">
                <div className="evaluate__user-img">
                  <img src="./images/avatar/avatar_user_4.jpg" alt="" />
                </div>
                <div className="evaluate__content">
                  <div className="evaluate__content-icon">
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                    <i className="evaluate__content-icon--star fas fa-star"></i>
                  </div>
                  <h3 className="evaluate__content--name">Hồ Ngọc Tài</h3>
                  <p className="evaluate__content--desc">
                    {/* {newProduct
                      ? newProduct[4]?.[0]?.reviewContent
                      : `There are many meaningful books here and their prices are also very reasonable`} */}
                    Đây là một quyển sách rất hay, hài hước và đầy tình nhân văn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
