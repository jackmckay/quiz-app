import React from "react"

export default function Navbar(props) {
	return (
		<nav className="nav">
			<h1>Quiz App</h1>

			<div className="toggler">
				<p className="toggler--light">Light</p>
				<div className="toggler--slider" onClick={props.toggleDarkMode}>
					<div className="toggler--slider--circle"/>
				</div>
				<p className="toggler--dark">Dark</p>
			</div>
		</nav>
	)
}