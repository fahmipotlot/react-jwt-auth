import React, { useState } from "react";
import ArticleDataService from "../../services/ArticleService";

const AddArticle = () => {
  const initialArticleState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [article, setArticle] = useState(initialArticleState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  const saveArticle = () => {
    var data = {
      title: article.title,
      description: article.description
    };

    ArticleDataService.create(data)
      .then(response => {
        setArticle({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newArticle = () => {
    setArticle(initialArticleState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newArticle}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={article.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={article.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveArticle} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArticle;