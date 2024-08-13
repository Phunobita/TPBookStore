import React, { useState } from "react";
import CreateSlider from "./CreateSlider";
import SliderTable from "./SliderTable";
import UpdateSlider from "./UpdateSlider";

const SliderComponent = () => {
  const [isEditSlider, setIsEditSlider] = useState(false);
  const [currentSlider, setCurrentSlider] = useState("");

  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Slider</h2>
      </div>

      <div className="row admin__sliders-banner">
        <div className="card shadow-sm col-lg-3 col-md-12 col-sm-12 admin__sliders-banner-item">
          {/* Create slider or Update slider*/}
          {isEditSlider ? (
            <UpdateSlider currentSlider={currentSlider} setIsEditSlider={setIsEditSlider} />
          ) : (
            <CreateSlider />
          )}
        </div>
        <div className="card col-lg-9 col-md-12 col-sm-12 admin__sliders-banner-item-table">
          <SliderTable setIsEditSlider={setIsEditSlider} setCurrentSlider={setCurrentSlider} />
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
