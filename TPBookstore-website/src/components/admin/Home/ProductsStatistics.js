import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <iframe
            title="Products statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100%",
              height: "350px"
            }}
            src="https://charts.mongodb.com/charts-tpbookstore-dyxdp/embed/charts?id=6369f685-f805-4ded-8bc5-b7b76c21177f&maxDataAge=1800&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
