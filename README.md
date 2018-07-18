# NYT Scrapper with React

The deployed app can be found at: https://nyt-react-thill2.herokuapp.com/

Current bugs: When new articles are saved, the other recently saved articles appear to copy the newly saved article.  If you refresh the page, the saved articles are all displayed properly again.  This appeared to work locally but is giving me trouble once deployed.  Time permitting I will go back and find the root cause for this.
There's another issue with articles that don't have their date saved in the same format, not being displayed properly.  In this case the "Article Date:" field shoud be removed from the component.

Adding/removing custom notes is not an option for this version of the NYT scrapper, but that can be seen in my other app: https://github.com/thill2/mongoscraper
