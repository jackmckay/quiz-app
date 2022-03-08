import React from 'react';
import './scss/style.scss';
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";

function App() {
	const [darkMode, setDarkMode] = React.useState(false);

	function toggleDarkMode() {
		setDarkMode(prevState => !prevState);
	}

	return (
		<div className={`App ${darkMode ? 'dark' : ''}`}>
			<div className="container">
				<Navbar toggleDarkMode={toggleDarkMode}/>
				<Quiz/>
			</div>
		</div>

	);
}

export default App;
