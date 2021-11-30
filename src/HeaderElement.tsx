import React, { Component } from "react";
import './HeaderElement.css';

class HeaderElement extends Component<{ href: string; logo: string; alt: string; }> {
  render() {
    return (
      <a className="HeaderElement" href={this.props.href}>
        <img className="HeaderElement-logo" src={this.props.logo} alt={this.props.alt} />
      </a>
    );
  }
}

export default HeaderElement;
