import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../base/LoadingError/Loading";
import { updateBannerAdmin, listBanner } from "../../../Redux/Actions/bannerActions";
import UploadImage from "../products/UploadImage";
import isEmpty from "validator/lib/isEmpty";

const UpdateBanner = ({ isEditBanner, currentBanner, setIsEditBanner, setCurrentBanner }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkTo, setLinkTo] = useState("");
  const [index, setIndex] = useState("");
  const [role, setRole] = useState("");
  const [validate, setValidate] = useState({});

  const bannerList = useSelector((state) => state.bannerList);
  const { banners } = bannerList;

  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { loading, success } = bannerUpdate;

  const updateBannerHandler = useCallback(() => {
    if (currentBanner || currentBanner === 0) {
      setName(banners[currentBanner]?.name);
      setImage(banners[currentBanner]?.image);
      setLinkTo(banners[currentBanner]?.linkTo);
      setIndex(banners[currentBanner]?.index);
      setRole(banners[currentBanner]?.role);
    }
  }, [banners, currentBanner]);
  useEffect(() => {
    if (success) {
      setCurrentBanner("");
      setName("");
      setImage("");
      setLinkTo("");
      setIsEditBanner(false);
      dispatch(listBanner());
    }
  }, [dispatch, setIsEditBanner, success]);
  useEffect(() => {
    updateBannerHandler();
  }, [updateBannerHandler]);
  const cancelHandler = () => {
    setName("");
    setImage("");
    setLinkTo("");
    setIsEditBanner(false);
  };

  const isEmptyCheckUpdateBanner = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Vui lòng nhập tên Banner";
    }

    if (!image) {
      msg.image = "Vui lòng chọn ảnh";
    }

    if (isEmpty(linkTo)) {
      msg.linkTo = "Vui lòng nhập liên kết";
    }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const submitHandler = () => {
    const isEmptyValidate = isEmptyCheckUpdateBanner();
    if (!isEmptyValidate) return;

    const banner = new FormData();
    banner.append("name", name);
    banner.append("image", JSON.stringify(image));
    banner.append("linkTo", linkTo);
    const bannerId = banners[currentBanner]?._id;
    dispatch(updateBannerAdmin(bannerId, banner));
  };

  return (
    <>
      <div className="">
        <div>
          {loading && <Loading />}
          <div className="admin__sliders-banner-update">
            <div className="d-flex justify-content-between admin__sliders-banner-update-input">
              <div className="">
                <label htmlFor="banner_name" className="form-label">
                  Tên Banner
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên banner"
                  className={`form-control ${validate.name?.length > 0 ? "border-red" : ""}`}
                  id="banner_name"
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
              <div className="">
                <label htmlFor="banner_image" className="form-label">
                  Hình ảnh
                </label>
                <span className="upload__img-both">
                  <UploadImage image={image} setImage={(value) => setImage(value)} />
                </span>
                <p className="msg__validate">{validate.image}</p>
              </div>
              <div className="">
                <label htmlFor="banner_linkTo" className="form-label">
                  Liên kết đến
                </label>
                <input
                  type="text"
                  placeholder="Nhập liên kết"
                  className={`form-control ${validate.linkTo?.length > 0 ? "border-red" : ""}`}
                  id="banner_linkTo"
                  value={linkTo}
                  onChange={(e) => setLinkTo(e.target.value)}
                  onClick={() => {
                    setValidate((values) => {
                      const x = { ...values };
                      x.linkTo = "";
                      return x;
                    });
                  }}
                />
                <p className="msg__validate">{validate.linkTo}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button disabled={!isEditBanner} className="btn btn-danger p-2" onClick={() => cancelHandler()}>
                Hủy
              </button>
              <button disabled={!isEditBanner} className="btn btn-warning p-2" onClick={() => submitHandler()}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBanner;
