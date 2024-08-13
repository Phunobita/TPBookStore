import React from "react";

const Modal = (props) => {
  const { modalTitle, modalBody, btnTitle, btnType, handler } = props;
  return (
    <>
      {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button> */}
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {modalTitle}
              </h5>
              <button
                className="close px-1"
                data-dismiss="modal"
                aria-label="Close"
                style={{ color: "gray", border: "none", backgroundColor: "white" }}
              >
                <span aria-hidden="true" style={{ fontSize: "32px", color: "#333" }}>
                  &times;
                </span>
              </button>
            </div>
            <div class="modal-body">{modalBody}</div>
            <div class="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" class="btn btn-secondary px-4" data-dismiss="modal">
                Đóng
              </button>
              {btnType === "delete" ? (
                <button type="button" class="btn btn-danger  px-4" onClick={() => handler()} data-dismiss="modal">
                  {btnTitle}
                </button>
              ) : btnType === "confirm" ? (
                <button type="button" class="btn btn-primary  px-4" onClick={() => handler()} data-dismiss="modal">
                  {btnTitle}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
