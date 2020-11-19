import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../../logo.svg';

const endpoint = "https://jsonplaceholder.typicode.com/posts";

const PostList = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [oError, setOerror] = useState(null);
  const [isRefresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setNews([])
    setLoading(false)
    setError(false)
    setOerror(false)
    setRefresh(false)
  }

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${endpoint}`);
        const result = await response.data

        setNews(result)
      } catch (e) {
        const resMessage = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
        
        // console.log(resMessage);
        
        setError(true)
        setOerror(resMessage)
      }
      setLoading(false)
    }

    fetchData()
  }, [isRefresh] )

  // console.log(news);

  return (
    <div className="container">
      <h3>Top News Headline </h3>
      <Link
        to={"/post-add"}
        className="m-3 btn btn-sm btn-success"
      >
        Add
      </Link>
      {isLoading && <p> Loading...</p>}
      {isError && <p> mon maap ada gangguan bos {oError}</p>}
      {news.map((item, index) => (
        <div className="card" key={index} style={ { width: '300px' } }>
          <img className="card-img-top" src={logo} alt="post" />
          <div className="card-body">
            <h4 className="card-title">{item.title}</h4>
            <p className="card-text">{item.body.substring(0, 100)}</p>
            <a href={"/post/" + item.id} className="btn btn-primary">read more</a>
          </div>
        </div>
      ))}
      <button onClick={handleRefresh} disabled={isLoading}>
        Refresh{" "}
      </button>
    </div>
  );
}

export default PostList;