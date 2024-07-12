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
        // var triviaQuiz = [
        //     {
        //         question: 'Which composer is known for his 24 Caprices for Solo Violin, a cornerstone of violin repertoire?',
        //         answers: [
        //             'Niccolò Paganini',
        //             'Antonio Vivaldi',
        //             'Johann Sebastian Bach',
        //             'Wolfgang Amadeus Mozart'
        //         ]
        //     },
        //     {
        //         question: "Which composer is known for writing 'The Well-Tempered Clavier'?",
        //         answers: [
        //             'Johann Sebastian Bach',
        //             'Ludwig van Beethoven',
        //             'Wolfgang Amadeus Mozart',
        //             'Franz Schubert'
        //         ]
        //     },
        //     {
        //         question: 'Which composer was known for his innovative use of the twelve-tone technique?',
        //         answers: [
        //             'Arnold Schoenberg',
        //             'Ludwig van Beethoven',
        //             'Johann Sebastian Bach',
        //             'Wolfgang Amadeus Mozart'
        //         ]
        //     },
        //     {
        //         question: "Who composed the opera 'The Barber of Seville'?",
        //         answers: [
        //             'Gioachino Rossini',
        //             'Wolfgang Amadeus Mozart',
        //             'Ludwig van Beethoven',
        //             'Franz Schubert'
        //         ]
        //     },
        //     {
        //         question: "Which composer is known for his innovative use of silence in the piece '4′33″'?",
        //         answers: [
        //             'John Cage',
        //             'Igor Stravinsky',
        //             'Arnold Schoenberg',
        //             'Philip Glass'
        //         ]
        //     }
        // ]
        res.status(200).send(triviaQuiz)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

export { generateTriviaQuestions };