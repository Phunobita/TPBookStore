import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../base/LoadingError/Loading";
import { updateBannerAdmin, listSlider } from "../../../Redux/Actions/bannerActions";
import { toast } from "react-toastify";
import UploadImage from "../products/UploadImage";
import isEmpty from "validator/lib/isEmpty";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const UpdateSlider = ({ currentSlider, setIsEditSlider }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkTo, setLinkTo] = useState("");
  const [validate, setValidate] = useState({});

  const sliderList = useSelector((state) => state.sliderList);
  const { sliders } = sliderList;

  const sliderUpdate = useSelector((state) => state.bannerUpdate);
  const { loading, success } = sliderUpdate;

  const updateSLiderHandler = useCallback(() => {
    setName(sliders[currentSlider]?.name);
    setImage(sliders[currentSlider]?.image);
    setLinkTo(sliders[currentSlider]?.linkTo);
  }, [sliders, currentSlider]);

  useEffect(() => {
    updateSLiderHandler();
  }, [updateSLiderHandler]);

  useEffect(() => {
    if (success) {
      setIsEditSlider(false);
      dispatch(listSlider());
    }
  }, [dispatch, setIsEditSlider, success]);

  const isEmptyCheckUpdateSlider = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Vui lòng nhập tên Slider";
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
    const isEmptyValidate = isEmptyCheckUpdateSlider();
    if (!isEmptyValidate) return;

    const slider = new FormData();
    slider.append("name", name);
    slider.append("image", JSON.stringify(image));
    slider.append("linkTo", linkTo);
    const sliderId = sliders[currentSlider]?._id;
    dispatch(updateBannerAdmin(sliderId, slider));
  };

  return (
    <>
      <div className="admin__sliders-banner-update">
        <div>
          {loading && <Loading />}
          <div className="d-flex justify-content-between admin__sliders-banner-update-input">
            <div className="">
              <label htmlFor="slider_name" className="form-label">
                Tên Slider
              </label>
              <input
                type="text"
                placeholder="Nhập tên slider"
                className={`form-control ${validate.name?.length > 0 ? "border-red" : ""}`}
                id="slider_name"
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
              <label htmlFor="slider_image" className="form-label">
                Hình ảnh
              </label>
              {/* <input
                type="url"
                placeholder="Nhập url hình ảnh"
                className="form-control"
                id="slider_image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              /> */}
              <span className="upload__img-both">
                <UploadImage image={image} setImage={(value) => setImage(value)} />
              </span>
              <p className="msg__validate">{validate.image}</p>
            </div>
            <div className="">
              <label htmlFor="slider_linkTo" className="form-label">
                Liên kết đến
              </label>
              <input
                type="text"
                placeholder="Nhập liên kết"
                className={`form-control ${validate.linkTo?.length > 0 ? "border-red" : ""}`}
                id="slider_linkTo"
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
            <button className="btn btn-danger p-2" onClick={() => setIsEditSlider(false)}>
              Hủy
            </button>
            <button className="btn btn-warning p-2" onClick={() => submitHandler()}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSlider;
