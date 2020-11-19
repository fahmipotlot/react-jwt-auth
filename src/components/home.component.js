import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState({content: ""});

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent({content: response.data});
      },
      error => {
        setContent({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content.content}</h3>
      </header>
    </div>
  );
}

export default Home