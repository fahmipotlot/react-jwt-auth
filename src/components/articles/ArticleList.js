import React, { useState, useEffect } from "react";
import ArticleDataService from "../../services/ArticleService";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const ArticlesList = () => {
  const [article, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  useEffect(() => {
    retrieveArticles();
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveArticles = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    ArticleDataService.getAll(params)
      .then(response => {
        const { tutorials, totalPages } = response.data;

        setArticles(tutorials);
        setCount(totalPages);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveArticles();
    setCurrentArticle(null);
    setCurrentIndex(-1);
  };

  const setActiveArticle = (tutorial, index) => {
    setCurrentArticle(tutorial);
    setCurrentIndex(index);
  };

  const removeAllArticles = () => {
    ArticleDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ArticleDataService.findByTitle(searchTitle)
      .then(response => {
        setArticles(response.data.tutorials);
        console.log(response.data.tutorials);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Articles List</h4>

        <div className="m-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

        <ul className="list-group">
          {article &&
            article.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveArticle(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <Link
          to={"/add"}
          className="m-3 btn btn-sm btn-success"
        >
          Add
        </Link>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllArticles}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentArticle ? (
          <div>
            <h4>Article</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentArticle.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentArticle.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentArticle.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/article/" + currentArticle.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Article...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesList;