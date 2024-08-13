import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

const UploadImage = (props) => {
  const { image, setImage } = props;
  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");

  const onChange = (imageList) => {
    // data for submit
    setImage(imageList[0]?.data_url);
    setImageInput(imageList[0]?.data_url);
    setImages(imageList);
    setImagePreview(imageList[0]?.data_url);
  };
  useEffect(() => {
    if (imageUrlInput) {
      setImageInput("");
      setImagePreview(imageUrlInput);
      setImage(imageUrlInput);
    }
  }, [imageUrlInput]);

  useEffect(() => {
    if (image) {
      setImageUrlInput(image);
    } else {
      setImageUrlInput("");
      setImageInput("");
      setImagePreview("");
    }
  }, [image]);

  useEffect(() => {
    if (imageInput) {
      setImageUrlInput("");
      setImagePreview(imageInput);
      setImage(imageInput);
    }
  }, [imageInput]);
  return (
    <div>
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="upload__image-item">
              <span
                className="upload__image-file"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i class="fas fa-file-image" title="Chọn ảnh"></i>
              </span>
              <input
                className="form-control upload__image-url"
                type="url"
                placeholder="Nhập URL hình ảnh"
                disabled={imageList.length > 0}
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
            </div>

            {/* {imageList.map((image, index) => ( */}
            {imagePreview && (
              <div className="upload__image-item">
                <img className="upload__image-img" src={imagePreview} alt="" />
                <span
                  className="upload__image-cancel"
                  title="Xoá ảnh"
                  onClick={() => {
                    onImageRemove(0);
                    setImageUrlInput("");
                  }}
                >
                  <i class="fas fa-window-close"></i>
                </span>
              </div>
            )}
            {/* ))} */}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
