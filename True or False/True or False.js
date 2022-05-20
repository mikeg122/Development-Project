const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "One of the most effective ways to exploit a victim is to mimic the appearance of a governement authority such as the FBI?",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "Malware is software that enters a computer system with the user's knowledge or consent and then performs an unwanted or harmful action",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "One of the best ways to stay safe online is to delete any emails coming from your bank.",
        choice1: "True",
        choice2: "False",
        answer: 2,
    },
    {
        question: "Tailgating is searching bins for valuable data.",
        choice1: "True",
        choice2: "False",
        answer: 2,
    },
    {
        question: "Baiting attacks are best described as offering something enticing to the end user, in exchange for their data.",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "Pretexting attacks is when a threat actor spams their victims with texts.",
        choice1: "True",
        choice2: "False",
        answer: 2,
    },
    {
        question: "Access control is a great way of mitigating tailgating attacks",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "Phishing is sending an email that falsely claims to be from a legitimate enterprise in an attempt to trick the user into surrendering private information.",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "A sign you could be being targeted is if you are recieving help you did not ask for.",
        choice1: "True",
        choice2: "False",
        answer: 1,
    },
    {
        question: "Scareware is effective because it keeps the victim calm in order to exploit them.",
        choice1: "True",
        choice2: "False",
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/C:/Users/micha/OneDrive/Documents/Uni%20Work/Uni%20Work/Final%20Year/FYP/True%20Or%20False/True%20Or%20False%20Results.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()