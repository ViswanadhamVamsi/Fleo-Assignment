import { Component } from "react";

class RepoHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="repoholder">
        <h3 className="name">
          <a className="link" href={this.props.item.html_url} target="_blank">
            {this.props.item.name}
          </a>
        </h3>
        <h4 className="description">Owner: {this.props.item.owner.login}</h4>
        <h4 className="description">
          Stars count: {this.props.item.stargazers_count}
        </h4>
        <h4 className="description">
          Number of forks: {this.props.item.forks_count}
        </h4>
        <h4 className="description">Language: {this.props.item.language}</h4>
        <p className="description">{this.props.item.description}</p>
      </div>
    );
  }
}

export default RepoHolder;
