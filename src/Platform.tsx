import { Component } from "react";
import './Platform.css';
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export type PlatformProps = {
  name: string,
  platform: string,
  logo: string,
}

type PlatformState = {
  hashText: string,
}

class Platform extends Component<PlatformProps, PlatformState> {

  url: string;

  constructor(props: PlatformProps) {
    super(props);
    this.url = `/api/v1/${this.props.platform}/latest`;
    this.state = {
      hashText: "Fetching hash...",
    };
  }

  componentDidMount() {
    fetch(`${this.url}/sha256`)
      .then(res => res.json())
      .then(data => this.setState({
        hashText: data['sha256']
      }))
  }

  render() {
    return (
      <div className="Platform">
        <img src={this.props.logo} className="Platform-logo" alt="logo" />
        <AwesomeButton type="primary" href={this.url} className="Platform-button">{this.props.name}</AwesomeButton>
        <p className="Platform-hash-title">sha256:</p>
        <p className="Platform-hash">{this.state.hashText}</p>
      </div>
    );
  }
}

export default Platform;
