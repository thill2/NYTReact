import React from "react";
// Import sub-components
import Search from "./children/Search";
import Saved from "./children/Saved";
// Helper Function
import helpers from "./utils/helpers";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      results: [],
      resultToSave: {},
      saved: []
    };

    this.setTerm = this.setTerm.bind(this);
    this.setArticleToSave = this.setArticleToSave.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  // When component mounts, render page with new saved articles
  componentDidMount() {
    // Get the latest history.
    helpers.getSaved().then(function(res) {
      if (res !== this.state.saved) {
        this.setState({ saved: res.data });
      }
    }.bind(this));
  }

  // Upon component update check for...
  componentDidUpdate(prevProps, prevState) {
    // search term changes, update search results
    if (prevState.searchTerm !== this.state.searchTerm) {
      helpers.runQuery(this.state.searchTerm).then((data) => {
        if (data !== this.state.results) {
          this.setState({ results: data });
        }
      });
    }
  }

  setTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

  // update saved articles
  setArticleToSave(index, article) {
    const newState = this.state.resultToSave;
    newState.title = article.title;
    newState.date = article.date;
    newState.url = article.url;

    this.setState({
      resultToSave: newState
    });

    helpers.saveArticle(this.state.resultToSave.title, this.state.resultToSave.date, this.state.resultToSave.url).then((data) => {
      console.log(data);
      this.setState(previousState => ({
        saved: [...previousState.saved, this.state.resultToSave],
        results: [...previousState.results.slice(0, index), ...previousState.results.slice(index+1)]
      }));
    });
  }

  // delete articles by ID
  deleteArticle(articleID, index) {
    console.log(articleID);
    helpers.deleteArticle(articleID).then(() => {
      this.setState((prevState) => ({
        saved: [...prevState.saved.slice(0,index), ...prevState.saved.slice(index+1)]
      }));
    });
  }

  render() {

    return (
      <div className="container">
        <div className="jumbotron">
          <h1>New York Times Article Scrapper</h1>
          <p>This time in React!</p>
        </div>
        <div className="row">
          <Search setTerm={this.setTerm} setArticleToSave={this.setArticleToSave} saved={this.state.saved} results={this.state.results} resultToSave={this.state.resultToSave} />
        </div>
        <div className="row">
          <Saved saved={this.state.saved} deleteArticle={this.deleteArticle} />
        </div>
      </div>
    );
  }
}

// Export the componen back for use in other files
export default Main;