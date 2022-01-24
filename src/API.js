import axios from "axios";

import { shuffleArray } from "./utils/shuffle";

export async function getQuestions(totalQuestions) {
    try {
        const questionsResponse = await axios.get(
            `https://opentdb.com/api.php?amount=${totalQuestions}`
        );

        return (
            questionsResponse.data.results.map((question) => ({
                ...question,
                answers: shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer,
                ]),
            }))
        );
    } catch (error) {
        alert(`Попробойте перезагрузить приложение. \nОшибка: ${error}`);
    }
}