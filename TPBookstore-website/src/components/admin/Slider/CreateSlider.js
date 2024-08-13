import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../base/LoadingError/Loading";
import { BANNER_CREATE_RESET } from "../../../Redux/Constants/bannerConstants";
import { createBannerAdmin, listSlider } from "../../../Redux/Actions/bannerActions";
import UploadImage from "../products/UploadImage";
import isEmpty from "validator/lib/isEmpty";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CreateSlider = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkTo, setLinkTo] = useState("");
  const [validate, setValidate] = useState({});

  const dispatch = useDispatch();

  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { loading, error, success } = bannerCreate;

  useEffect(() => {
    if (success) {
      toast.success("Thêm slider thành công", ToastObjects);
      dispatch({ type: BANNER_CREATE_RESET });
      setName("");
      setImage("");
      setLinkTo("");
      dispatch(listSlider());
    }
    if (error) {
      toast.error(error, ToastObjects);
      dispatch({ type: BANNER_CREATE_RESET });
    }
  }, [success, dispatch, loading, error]);

  const isEmptyCheckSlider = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Vui lòng nhập tên Slider";
    }

    if (isEmpty(image)) {
      msg.image = "Vui lòng chọn ảnh";
    }

    if (isEmpty(linkTo)) {
      msg.linkTo = "Vui lòng nhập liên kết";
    }
    setValidate(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isEmptyValidate = isEmptyCheckSlider();
    if (!isEmptyValidate) return;

    const slider = new FormData();

    slider.append("name", name);
    slider.append("index", 1);
    slider.append("image", JSON.stringify(image));
    slider.append("linkTo", linkTo);
    slider.append("role", "slider");
    dispatch(createBannerAdmin(slider));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        {loading && <Loading />}
        <div className="admin__sliders-banner-update">
          <div className="d-flex justify-content-between admin__sliders-banner-update-input">
            <div className="">
              <label htmlFor="slider_name" className="form-label">
                Tên Slider
              </label>
              <input
                // required
                type="text"
                placeholder="Nhập tên slider"
                className={`form-control ${validate.name?.length > 0 ? "border-red" : ""}`}
                id="slider_name"
                value={name}
                onClick={() => {
                  setValidate((values) => {
                    const x = { ...values };
                    x.borderRed1 = "";
                    x.name = "";
                    return x;
                  });
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="msg__validate">{validate.name}</p>
            </div>
            <div className="">
              <label htmlFor="slider_image" className="form-label">
                Hình ảnh
              </label>
              <span className="upload__img-both">
                <UploadImage image={image} setImage={setImage} />
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
                    x.borderRed3 = "";
                    x.linkTo = "";
                    return x;
                  });
                }}
              />
              <p className="msg__validate">{validate.linkTo}</p>
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-size btn-primary p-2">Thêm slider</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSlider;
