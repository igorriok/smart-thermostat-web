import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home";


function App() {
	return (
		<div className="App">
			<Router>

				<Routes>
					<Route path="/" element={<HomePage />}/>

					<Route path="*" element={<h4>Page not found</h4>} />
				</Routes>

			</Router>
		</div>
	);
}

export default App;
