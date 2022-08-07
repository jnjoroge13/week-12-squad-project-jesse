const searchBar = document.querySelector('.search-bar')
const searchBarObject = document.getElementsByClassName('search-bar')
const answerBodies = document.querySelectorAll('.answer-body')
const allAnswers = document.getElementsByClassName('answer-card')
const noAnswersFound = document.getElementsByClassName('no-answers-found')

const newAnswerCreateBtn = document.querySelector('#new-answer-create')
const createAnswerForm = document.getElementById('create-answer-form')
const newAnswerSubmitBtn = document.getElementById('new-answer-submit')

newAnswerCreateBtn.addEventListener('click', e => {
    createAnswerForm.classList.remove('hidden')
    newAnswerCreateBtn.classList.add('hidden')
})

searchBar.addEventListener('input', e => {
    for (let i = 0; i < allAnswers.length; i++){
        if (!(answerBodies[i].innerHTML.toLowerCase().includes(searchBarObject[0].value.toLowerCase()))) {
            allAnswers[i].classList.add('hidden')
        }
        if (answerBodies[i].innerHTML.toLowerCase().includes(searchBarObject[0].value.toLowerCase())) {
            allAnswers[i].classList.remove('hidden')
        }
    }
    if (document.getElementsByClassName('hidden answer-card').length == allAnswers.length) {
        noAnswersFound[0].classList.remove('hidden')
    }
    if (document.getElementsByClassName('hidden answer-card').length != allAnswers.length) {
        noAnswersFound[0].classList.add('hidden')
    }
})
