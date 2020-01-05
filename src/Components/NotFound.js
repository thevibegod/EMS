import React from 'react';
import Header from './Header.js';

export default function NotFound(){

  return(
    <div>
    <Header/>
    <div className="container text-center">
      <h1>Error 404</h1>
      <strong className="text-primary">The page you requested for is unavailable.</strong>
    </div>
    </div>
  );
}
