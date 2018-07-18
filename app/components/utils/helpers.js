// Include the axios package for performing HTTP requests 
import axios from "axios";

const authKey = "95c7d1b800924be789cd5c4a9193430f";
// Helper Functions
const helpers = {
  runQuery: (searchTerm) => {
    console.log(searchTerm);
    // NYTimes search URL + API key + searchterm
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm;
    return axios.get(queryURL).then((response) => {
      if(response.data.response.docs[0]) {
      	return response.data.response.docs;
      } else {
      	return "";
      }
    });
  },

  // Get saved articles.
  getSaved: () => {
  	return axios.get("/api/saved");
  },

  saveArticle: (articleTitle, articleDate, articleURL) => {
  	return axios.post("/api/saved",
  		{
  			title: articleTitle,
  			date: articleDate,
        url: articleURL
  		}
  	);
  },


  deleteArticle: (articleID) => {
  	return axios.delete("/api/saved/" + articleID)
  	.then(res =>  {
  		console.log("Deleting: " + res);
  	})
  	.catch(err => {
  		console.log(err);
  	});
  }

};

export default helpers;
