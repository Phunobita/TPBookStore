import React, { useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import UpdateCategory from "./UpdateCategory";

const MainCategories = () => {
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const handleEditCategory = () => setIsEditCategory(true);

  const handleCurrentCategory = (cate) => {
    setCurrentCategory(cate);
  };
  return (
    <>
      <section className="content-main mt-4">
        <div className="content-header">
          <h2 className="content-title">DANH MỤC</h2>
        </div>

        <div className="row shadow-sm">
          <div className="card shadow-sm p-2 pb-3 col-lg-3 col-md-12">
            {/* Create category or Update category*/}
            {isEditCategory ? (
              <UpdateCategory currentCategory={currentCategory} setIsEditCategory={setIsEditCategory} />
            ) : (
              <CreateCategory />
            )}
          </div>
          {/* Categories table */}
          <div className="card p-3 col-lg-9 col-md-12">
            <CategoriesTable
              setIsEditCategory={setIsEditCategory}
              handleEditCategory={handleEditCategory}
              handleCurrentCategory={handleCurrentCategory}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCategories;
