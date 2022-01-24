import React from "react";
import classNames from "classnames";

const QuestionCard = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}) => {
	return (
		<div className="question-card">
			<p className="question-number">
				Question: {questionNumber} / {totalQuestions}
			</p>

			<p dangerouslySetInnerHTML={{ __html: question }} className="question" />

			<ul className="answers">
				{answers.map((answ) => (
					<li
						key={answ}
						className={classNames({
							correct: userAnswer?.correctAnswer === answ,
							incorrect: userAnswer?.answer === answ,
						})}
					>
						<button
							className="answer-btn"
						 	value={answ}
							dangerouslySetInnerHTML={{ __html: answ }}
							disabled={userAnswer ? true : false}
							onClick={callback}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuestionCard;
