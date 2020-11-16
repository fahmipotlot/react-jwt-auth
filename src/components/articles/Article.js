import React, { useState, useEffect } from "react";
import ArticleDataService from "../../services/ArticleService";

const Article = props => {
  const initialArticleState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentArticle, setCurrentArticle] = useState(initialArticleState);
  const [message, setMessage] = useState("");

  const getArticle = id => {
    ArticleDataService.get(id)
      .then(response => {
        setCurrentArticle(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getArticle(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentArticle({ ...currentArticle, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentArticle.id,
      title: currentArticle.title,
      description: currentArticle.description,
      published: status
    };

    ArticleDataService.update(currentArticle.id, data)
      .then(response => {
        setCurrentArticle({ ...currentArticle, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateArticle = () => {
    ArticleDataService.update(currentArticle.id, currentArticle)
      .then(response => {
        console.log(response.data);
        setMessage("The article was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteArticle = () => {
    ArticleDataService.remove(currentArticle.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/articles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentArticle ? (
        <div className="edit-form">
          <h4>Article</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentArticle.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentArticle.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentArticle.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentArticle.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteArticle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateArticle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Article...</p>
        </div>
      )}
    </div>
  );
};

export default Article;