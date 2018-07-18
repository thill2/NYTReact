import React from "react";
import ReactDOM from "react-dom";
// Routing for single-page app.
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";

// Render Main route.
ReactDOM.render(
	(
		<BrowserRouter>
			<Route path="/" component={Main} />
		</BrowserRouter>
	),
	document.getElementById("app")
);
