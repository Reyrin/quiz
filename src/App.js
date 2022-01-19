import React from "react";
import axios from "axios";

import "./App.css";
import { shuffleArray } from "./utils/shuffle";

import QuestionCard from "./components/QuestionCard";

function App() {
	const [loading, setLoading] = React.useState(true);
	const [questions, setQuestions] = React.useState([]);
	const [number, setNumber] = React.useState(0);
	const [userAnswers, setUserAnswers] = React.useState([]);
	const [score, setScore] = React.useState(0);
	const [gameOver, setGameOver] = React.useState(true);

	React.useEffect(() => {
		async function getQuestions() {
			try {
				const questionsResponse = await axios.get(
					`https://opentdb.com/api.php?amount=10`
				);

				setQuestions(
					questionsResponse.data.results.map((question) => ({
						...question,
						answers: shuffleArray([
							...question.incorrect_answers,
							question.correct_answer,
						]),
					}))
				);

				setLoading(false);
			} catch (error) {
				alert(`Попробойте перезагрузить приложение. \nОшибка: ${error}`);
			}
		}

		getQuestions();
	}, []);

	return (
		<div className="App">
			<h1>REACT QUIZ</h1>

			{!loading && (
				<QuestionCard
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={"gip"}
					callback={() => console.log(123)}
					questionNr={5}
					totalQuestions={10}
				/>
			)}
		</div>
	);
}

export default App;
