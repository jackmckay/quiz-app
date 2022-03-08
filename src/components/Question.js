import React from "react";

export default function Question(props) {
	const [options, setOptions] = React.useState(props.options)

	function selectOption(selectedOption) {
		if (!props.quizComplete) {
			setOptions(prevOptions => prevOptions.map(option => {
				return option === selectedOption ?
					//toggle isSelected for seleted answer
					{...option, isSelected: true} :
					//else unselect all answers
					{...option, isSelected: false}
			}))
			props.handleAnswer(props.index, selectedOption);
		}
	}

	function checkCorrect(option) {
		if (props.quizComplete && option.isCorrect) {
			return 'correct'
		} else if (props.quizComplete && option.isSelected) {
			return 'incorrect'
		}
	}

	return (
		<div className="questions">
			<div className="question" key={props.id}>
				<h3 className="title">{props.title}</h3>
				<div className="answers">
					{options.map((option) => (
						<div className={`button ${option.isSelected ? 'selected' : ''} ${checkCorrect(option)}`}
							key={option.text}
							onClick={() => selectOption(option)}
						>
							{option.text}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
