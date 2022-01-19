import React from "react";

const QuestionCard = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => {
	return (
		<div className="QuestionCard">
			<p className="number">
				Question: {questionNr} / {totalQuestions}
			</p>

			<p className="question">{question}</p>

			<ul className="answers">
				{answers.map((answ) => (
					<li
						key={answ}
						style={{
							color:
								userAnswer === answ ? "red" : "",
						}}
						onClick={callback}
					>
						{answ}
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuestionCard;
