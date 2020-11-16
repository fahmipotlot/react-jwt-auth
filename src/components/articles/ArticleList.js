import React, { useState, useEffect } from "react";
import ArticleDataService from "../../services/ArticleService";
import { Link } from "react-router-dom";

const ArticlesList = () => {
  const [article, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveArticles();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveArticles = () => {
    ArticleDataService.getAll()
      .then(response => {
        setArticles(response.data.tutorials);
        console.log(response.data.tutorials);
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