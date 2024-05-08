import React from 'react';
import '../../styles/NotFound.css'

const NotFound= () => {
  return (
    <div className="not-found-page">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <a href="/">Go back to the homepage</a>
    </div>
  );
};

export default NotFound;