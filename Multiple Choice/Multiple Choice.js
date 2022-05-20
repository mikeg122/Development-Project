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
        question: "The traditional attack lifecycle has how many steps?",
        choice1: "2",
        choice2: "4",
        choice3: "5",
        choice4: "3",
        answer: 2,
    },
    {
        question:
            "In general, what does Social Engineering rely on?",
        choice1: "Human error",
        choice2: "System error",
        choice3: "Technical skills",
        choice4: "People skills",
        answer: 1,
    },
    {
        question: "What percent of IT professionals say they have seen colleagues fall victim of a Social Engineering attack?",
        choice1: "20%",
        choice2: "18%",
        choice3: "71%",
        choice4: "74%",
        answer: 3,
    },
    {
        question: "Phishing creates a sense of _____ in victims?",
        choice1: "Urgency, curiosity or fear",
        choice2: "Urgency, concern or fear",
        choice3: "Anger, happiness or concern",
        choice4: "Anger, happiness or curosity",
        answer: 1,
    },
    {
        question: "Baiting is a way of enticing the victim with what?",
        choice1: "A physically malicious item",
        choice2: "A car",
        choice3: "A malicious email",
        choice4: "A friendly approach",
        answer: 1,
    },
    {
        question: "In relation to Social Engineering, Tailgating is a way of?",
        choice1: "Gaining access to a victims emails",
        choice2: "Listening in on a valuable conversation",
        choice3: "Following the vehicle in front of you too closely in which there is a risk of injury",
        choice4: "Following an individual into an area that they are authorised to access, but you are not",
        answer: 4,
    },
    {
        question: "Pretexting involves the scammer posing as",
        choice1: "A friend",
        choice2: "A close colleague",
        choice3: "A well known entity or individual",
        choice4: "A family member",
        answer: 3,
    },
    {
        question: "An example of a security measure that would reduce the likelihood of a tailgating attack is?",
        choice1: "A keycard",
        choice2: "A secret metal key",
        choice3: "Signing in and out at reception",
        choice4: "Closing the door quickly when entering or exiting the building",
        answer: 1,
    },
    {
        question: "Scareware attempts to make the victim believe their system is infected with?",
        choice1: "Malware",
        choice2: "Spyware",
        choice3: "Trojan horses",
        choice4: "Worms",
        answer: 3,
    },
    {
        question: "The key elements that make Scareware successful is?",
        choice1: "Large writing, flashing and red font",
        choice2: "Large images, red font, and payment methods",
        choice3: "Large font, contact methods, and payment methods",
        choice4: "Small writing, red font, and a payment methods",
        answer: 1,
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
        return window.location.assign('/C:/Users/micha/OneDrive/Documents/Uni%20Work/Uni%20Work/Final%20Year/FYP/Multiple%20Choice/Multiple%20Choice%20Results.html')
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