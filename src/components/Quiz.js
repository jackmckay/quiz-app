import Question from "./Question";
import {nanoid} from 'nanoid';
import Confetti from "react-confetti";
import React from "react";


export default function Quiz() {
	const [questions, setQuestions] = React.useState([]);
	const [answers, setAnswers] = React.useState([]);
	const [quizComplete, setQuizComplete] = React.useState(false);
	const [perfect, setPerfect] = React.useState(false);

	React.useEffect(() => {
		newQuestions();
	}, []);

	function newQuestions() {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986")
			.then(res => res.json())
			.then(data => buildQuestions(data.results));
	}

	function buildQuestions(questions) {
		const qs = []
		questions.forEach(question => {

			const options = question.incorrect_answers.map(answer => {
				return {
					id: nanoid(),
					text: decodeURIComponent(answer),
					isCorrect: false,
					isSelected: false
				}
			}).concat([{
				id: nanoid(),
				text: decodeURIComponent(question.correct_answer),
				isCorrect: true,
				isSelected: false
			}])

			options.sort((a, b) => {
				let fa = a.text.toLowerCase(),
					fb = b.text.toLowerCase();
				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});

			qs.push({
				id: nanoid(),
				category: question.category,
				title: decodeURIComponent(question.question),
				options: options
			})
		})
		setQuestions(qs);
	}

	function handleAnswer(questionIndex, answer) {
		let answersArr = [...answers]; // copying the old answers array
		answersArr[questionIndex] = answer; //update answer at index
		setAnswers(answersArr);
	}

	function checkAnswers() {
		if (canComplete()) {
			setQuizComplete(true);
		}
		if (correctAnswers().length === questions.length) {
			setPerfect(true);
		}
	}

	function canComplete() {
		return (!answers.includes(undefined) && (answers.length === questions.length));
	}

	function correctAnswers() {
		return answers.filter(answer => answer.isCorrect);
	}

	function newGame() {
		setAnswers([]);
		setQuizComplete(false);
		setPerfect(false);
		setQuestions([]);
		newQuestions();
	}

	return (
		<main>
			{perfect && <Confetti />}
			<div className="questions">
			{questions.map((question, index) => (
				<Question
					index={index}
					key={question.id}
					quizComplete={quizComplete}
					handleAnswer={handleAnswer}
					{...question}
				/>
			))}
		</div>
		{quizComplete ? (
			<>
				<h4>{perfect && 'Perfect!'} You scored {correctAnswers().length} / {questions.length} correct answers</h4>
				<button className="button submit-button" onClick={newGame}>New Game</button>
			</>
		) : (
			<button className={`button submit-button ${canComplete() ? '' : 'disabled'}`} onClick={checkAnswers}>Check Answers</button>
		)}
	</main>
	)
}