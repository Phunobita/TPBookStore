import React, { useState } from "react";
import BannerTable from "./BannerTable";
import UpdateBanner from "./UpdateBanner";

const BannerComponent = () => {
  const [isEditBanner, setIsEditBanner] = useState(false);
  const [currentBanner, setCurrentBanner] = useState("");

  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Banner</h2>
      </div>

      <div className="row admin__sliders-banner">
        <div className="card shadow-sm col-lg-3 col-md-12 col-sm-12  admin__sliders-banner-item">
          <UpdateBanner
            isEditBanner={isEditBanner}
            currentBanner={currentBanner}
            setIsEditBanner={setIsEditBanner}
            setCurrentBanner={setCurrentBanner}
          />
        </div>
        <div className="card col-lg-9 col-md-12 col-sm-12 admin__sliders-banner-item-table">
          <BannerTable setIsEditBanner={setIsEditBanner} setCurrentBanner={setCurrentBanner} />
        </div>
      </div>
    </>
  );
};

export default BannerComponent;
