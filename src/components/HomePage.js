import { Component } from "react";
import axios from "axios";
import RepoHolder from "./RepoHolder";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentPage: 1,
      currentPerPage: 10,
      sortCritertia: "starts",
      orderBy: "desc",
      language: "JavaScript",
    };
    this.getData = this.getData.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.getNext = this.getNext.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get(
        `https://api.github.com/search/repositories?q=language:${this.state.language}&sort=${this.state.sortCritertia}&order=${this.state.orderBy}&page=${this.state.currentPage}&per_page=${this.state.currentPerPage}`
      )
      .then((res) => this.setState({ data: res.data }))
      .then((res) => console.log("Date fetched"));
  }

  getPrev() {
    if (this.state.currentPage == 1) {
      return;
    } else {
      this.setState({ currentPage: this.state.currentPage - 1 });
      this.getData();
    }
  }

  getNext() {
    console.log("called");
    if (this.state.currentPage + 10 > this.state.data.total_count) {
      return;
    } else {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        this.getData();
      });
    }
  }

  search(e) {
    let search = document.querySelector("#search");
    let check = document.querySelector("#option");
    if (check.options[check.selectedIndex].text === "Language") {
      this.setState({ language: search.textContent });
      console.log(search.val);
    } else {
      this.setState({ name: search.textContent });
    }
    console.log(search);
  }

  setCurrentPage(page) {}

  render() {
    return (
      <div>
        {this.state.data ? (
          <div className="holder">
            <h1>Git repos</h1>
            <span>
              Search:{" "}
              <select id="option">
                <option value={"language"}>Language</option>
                <option value={"name"}>Name</option>
              </select>
              <input
                id="search"
                className="searchInput"
                type={"text"}
                placeholder="Enter search term"
              ></input>
              <button onClick={this.search}>Fetch</button>
            </span>
            {this.state.data.items.map((e) => {
              return <RepoHolder item={e} />;
            })}
            {
              <div className="paginateholder">
                <button className="arrows" onClick={this.getPrev}>
                  {"<"}
                </button>
                <p className="pagenumber">{this.state.currentPage}</p>
                <button className="arrows" onClick={this.getNext}>
                  {">"}
                </button>
              </div>
            }
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}

export default HomePage;
