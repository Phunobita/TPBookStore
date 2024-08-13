import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "", limit, categorySlug = "" } = props;

  const previousPageQuery = `&p=${page > 1 ? page - 1 : page}`;
  const nextPageQuery = `&p=${page < pages ? page + 1 : pages}`;
  const baseQuery = keyword
    ? categorySlug
      ? `/search/category/${categorySlug}?q=${keyword}`
      : `/search?q=${keyword}`
    : categorySlug
    ? `/category/${categorySlug}?`
    : `?`;
  const limitQuery = limit ? `&limit=${limit}` : "";

  let listPages = [];
  if (pages <= 5) {
    for (let i = 1; i <= pages; i++) {
      listPages.push(i);
    }
  } else {
    listPages = [];
    if (page < 3) {
      listPages.push(1, 2, 3, "...", pages);
    } else if (page === 3) {
      listPages.push(1, 2, 3, 4, "...", pages);
    } else if (page === pages - 2) {
      listPages.push(1, "...", pages - 3, pages - 2, pages - 1, pages);
    } else if (page > pages - 2) {
      listPages.push(1, "...", pages - 2, pages - 1, pages);
    } else {
      listPages.push(1, "...", page - 1, page, page + 1, "...", pages);
    }
  }

  return (
    pages > 1 && (
      <nav className="pagination-group">
        <div className="icon-left">
          <Link to={`${baseQuery}${limitQuery}${previousPageQuery}`}>
            <i className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <ul className="pagination justify-content-center">
          {listPages.map((x) =>
            typeof x === "number" ? (
              <li className={`page-item ${x === page ? "active" : ""}`} key={x}>
                <Link className="page-link" to={`${baseQuery}${limitQuery}&p=${x}`}>
                  {x}
                </Link>
              </li>
            ) : (
              <li className={`page-item`}>
                <Link className="page-link page-link__dots">{x}</Link>
              </li>
            )
          )}
        </ul>
        <div className="icon-right">
          <Link to={`${baseQuery}${limitQuery}${nextPageQuery}`}>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </nav>
    )
  );
};

export default Pagination;
