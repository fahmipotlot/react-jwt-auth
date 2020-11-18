import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const endpoint = "https://jsonplaceholder.typicode.com/posts";

const AddPost = () => {
  const initialPostState = {
    id: null,
    title: "",
    body: ""
  };
  const [post, setPost] = useState(initialPostState);
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
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
    var data = {
      title: post.title,
      body: post.body
    };

    axios.post(`${endpoint}`, data)
      .then(response => {
        setPost({
          id: response.data.id,
          title: response.data.title,
          body: response.data.body
        });
        setSubmitted(true);
        // console.log(response.data);
      })
      .catch(e => {
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();        
        // console.log(resMessage);
        setError(resMessage);
      });
  };

  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
    setError(null)
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link
            to={"/post"}
            className="m-3 btn btn-success"
          >
            Post List
          </Link>
          <button className="btn btn-success" onClick={newPost}>
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
              value={post.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Body</label>
            <input
              type="text"
              className="form-control"
              id="body"
              required
              value={post.body}
              onChange={handleInputChange}
              name="body"
            />
          </div>

          <button onClick={savePost} className="btn btn-success">
            Submit
          </button>
          <Link
            to={"/post"}
            className="m-3 btn btn-success"
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddPost;