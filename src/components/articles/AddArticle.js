import React, { useState } from "react";
import ArticleDataService from "../../services/ArticleService";
import { Link } from "react-router-dom";

const AddArticle = () => {
  const initialArticleState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [article, setArticle] = useState(initialArticleState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null)
  const errorDiv = error 
      ? <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {error}
          </div> 
        </div> 
      : '';

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
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
        
        console.log(resMessage);

        setError(resMessage);
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
          <Link
            to={"/articles"}
            className="m-3 btn btn-success"
          >
            Article List
          </Link>
          <button className="btn btn-success" onClick={newArticle}>
            Add
          </button>
        </div>
      ) : (
        <div>
          {errorDiv}
          
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
          <Link
            to={"/articles"}
            className="m-3 btn btn-success"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddArticle;