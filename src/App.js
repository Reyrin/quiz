import React from "react";

import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { getQuestions } from "./API";

function App() {
	const [loading, setLoading] = React.useState(true);
	const [questions, setQuestions] = React.useState([]);
	const [number, setNumber] = React.useState(0);
	const [userAnswers, setUserAnswers] = React.useState("");
	const [score, setScore] = React.useState(0);
	const [gameOver, setGameOver] = React.useState(true);

	const TOTAL_QUESTIONS = 10;

	const start = async () => {
		setLoading(true);
		const newQuestion = await getQuestions(TOTAL_QUESTIONS);

		setQuestions(newQuestion);
		setUserAnswers([]);
		setScore(0);
		setNumber(0);
		setGameOver(false);
		setLoading(false);
	};

	const checkAnswer = (e) => {
		const answer = e.target.attributes.value.value;
		const correct = questions[number].correct_answer === answer;

		if (correct) setScore((prev) => prev + 1);

		const answerObject = {
			question: questions[number].question,
			answer,
			correct,
			correctAnswer: questions[number].correct_answer,
		};

		setUserAnswers((prev) => [...prev, answerObject]);
	};

	const nextQuestion = () => {
		const nextQ = number + 1;

		if (nextQ === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQ);
		}
	};

	return (
		<div className="quiz">
			<h1>REACT QUIZ</h1>
			{!gameOver && <h2>Score: {score}</h2>}

			{(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
				<button className="btn-start" onClick={start}>
					{userAnswers.length === TOTAL_QUESTIONS
						? "restart"
						: "start"}
				</button>
			)}

			{!loading && (
				<QuestionCard
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
					questionNumber={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
				/>
			)}

			{!gameOver &&
				!loading &&
				userAnswers.length === number + 1 &&
				number !== TOTAL_QUESTIONS - 1 && (
					<button onClick={nextQuestion} className="next-btn">Next</button>
				)}
		</div>
	);
}

export default App;
