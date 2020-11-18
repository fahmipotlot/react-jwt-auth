import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const endpoint = "https://jsonplaceholder.typicode.com/posts";

const Post = props => {
  const initialPostState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null)
  const errorDiv = error 
      ? <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {error}
          </div> 
        </div> 
      : '';

  const getPost = id => {
    axios.get(`${endpoint}/${id}`)
      .then(response => {
        setCurrentPost(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();        
        // console.log(resMessage);
        setError(resMessage);
      });
  };

  useEffect(() => {
    getPost(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
    console.log(currentPost)
  };

  const updatePost = id => {
    axios.put(`${endpoint}/${currentPost.id}`, currentPost)
      .then(response => {
        // console.log(response.data);
        setMessage("The article was updated successfully!");
        props.history.push("/post");
      })
      .catch(e => {
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();        
        // console.log(resMessage);
        setError(resMessage);
      });
  };

  const deletePost = () => {
    axios.delete(`${endpoint}/${currentPost.id}`)
      .then(response => {
        // console.log(response.data);
        props.history.push("/post");
      })
      .catch(e => {
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();        
        // console.log(resMessage);
        setError(resMessage);
      });
  };

  return (
    <div>
      {currentPost ? (
        <div className="edit-form">
          <h4>Post</h4>
          <form>
            {errorDiv}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Body</label>
              <input
                type="text"
                className="form-control"
                id="body"
                name="body"
                value={currentPost.body}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <Link
            to={"/post"}
            className="badge badge-warning mr-2"
          >
            Back
          </Link>

          <button className="badge badge-danger mr-2" onClick={deletePost}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePost}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};

export default Post;