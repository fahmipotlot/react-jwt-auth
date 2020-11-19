import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getModeratorBoard().then(
      response => {
        setContent(response.data);
      },
      error => {
        const _error = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            
        setContent(_error);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}

export default BoardAdmin