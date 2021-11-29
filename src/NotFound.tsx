import React, { Component } from 'react';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import './Downloads.css';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="Downloads">
        <header className="Downloads-header">
          <h1 className="Downloads-title">Not Found</h1>
          <h2 className="Downloads-subtitle">The requested page could not be found.</h2>
          <AwesomeButton className="NotFound-home-button" type="primary" href="/">Downloads</AwesomeButton>
        </header>
      </div>
    );
  }
}

export default NotFound;
