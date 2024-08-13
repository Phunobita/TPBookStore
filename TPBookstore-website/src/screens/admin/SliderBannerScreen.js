import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import BannerComponent from "./../../components/admin/Banner/BannerComponent";
import SliderComponent from "./../../components/admin/Slider/SliderComponent";
import Toast from "../../components/base/LoadingError/Toast";
import { toast } from "react-toastify";
import { BANNER_DELETE_RESET, BANNER_UPDATE_RESET } from "../../Redux/Constants/bannerConstants";
import Modal from "../../components/base/modal/Modal";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const UsersScreen = () => {
  const dispatch = useDispatch();

  const sliderUpdate = useSelector((state) => state.bannerUpdate);
  const { success: successUpdated, error: errorUpdated } = sliderUpdate;

  const sliderDelete = useSelector((state) => state.bannerDelete);
  const { success: successDel, error: errorDel } = sliderDelete;

  useEffect(() => {
    if (successDel) {
      toast.success("Xóa thành công!", ToastObjects);
    }
    if (errorDel) {
      toast.error(errorDel, ToastObjects);
    }
    dispatch({ type: BANNER_DELETE_RESET });
  }, [dispatch, successDel, errorDel]);

  useEffect(() => {
    if (successUpdated) {
      toast.success("Cập nhật thành công!", ToastObjects);
    }
    if (errorUpdated) {
      toast.error(errorUpdated, ToastObjects);
    }
    dispatch({ type: BANNER_UPDATE_RESET });
  }, [dispatch, successUpdated, errorUpdated]);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="shadow-sm">
            <div className="card shadow-sm p-3 pb-3 mb-3">
              <Toast />
              <div className="component__banner">
                <BannerComponent />
              </div>
              <div className="border__bottom-admin"></div>
              <div className="component__sliders">
                <SliderComponent />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UsersScreen;
