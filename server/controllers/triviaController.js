import { askGPT } from "../utils/helperFunctions.js";

const generateTriviaQuestions = async (req, res) => {
    try {

        var triviaQuiz = []
        for (let i = 0; i < 5; i++) {
            const response = await askGPT("Give me a trivia question about classical music, classical composers, \
                classical instruments, or classical eras. Dont make it too easy. Don't add \
                additional words to your answer. Answer with a JSON object without template literals. The answer \
                is a list of possible answers, and the first is the correct one. The keys should be 'question' and 'answers'");
            triviaQuiz.push(JSON.parse(response.choices[0].message.content));
        }

        console.log(triviaQuiz);
        res.status(200).send(triviaQuiz)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

export { generateTriviaQuestions };