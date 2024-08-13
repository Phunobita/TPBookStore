import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { listBanner } from "../../../Redux/Actions/bannerActions";

const BannerTable = ({ setIsEditBanner, setCurrentBanner }) => {
  const dispatch = useDispatch();

  const bannerList = useSelector((state) => state.bannerList);
  const { error, loading, banners } = bannerList;

  useEffect(() => {
    dispatch(listBanner());
  }, [dispatch]);

  return (
    <>
      <table className="admin__sliders-banner-table">
        <thead>
          <tr>
            <th className="admin__sliders-banner-table-id">STT</th>
            <th className="admin__sliders-banner-table-name">Tên</th>
            <th className="admin__sliders-banner-table-img">Hình ảnh</th>
            <th className="admin__sliders-banner-table-link">Liên kết đến</th>
            <th className="admin__sliders-banner-table-action text-end">Thao tác</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody className="admin__sliders-banner-table-content">
          {loading ? (
            <tr className="mb-5 mt-5">
              <Loading />
            </tr>
          ) : error ? (
            <tr>
              <Message variant="alert-danger">{error}</Message>
            </tr>
          ) : (
            banners?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td className="fw-bold">{item.name}</td>
                <td className="fw-bold">
                  <img src={item.image} alt="Slider" />
                </td>
                <td className="fw-bold">{item.linkTo}</td>
                <td className="text-end">
                  <div className="dropdown">
                    <Link to="#" data-bs-toggle="dropdown" title="Cập nhật" target="_blank">
                      <i
                        className="text-warning fas fa-edit"
                        onClick={() => {
                          setIsEditBanner(true);
                          setCurrentBanner(index);
                        }}
                      ></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default BannerTable;
