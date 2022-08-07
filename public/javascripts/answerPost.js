// console.log('Hello from your script')

// Find all delete buttons
// add event listener to each button
// send a fetch request to delete the correct post
// remove post from page with successful response

const newAnswerCreateBtn = document.getElementById(`new-answer-submit`)

newAnswerCreateBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const questionId = document.getElementById("questionIdDiv").innerText;
    const body = document.getElementById(`new-answer-body`).value
    const res = await fetch(`/${questionId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    })

    // div(class="answer-card" id=`answer-card-${answer.id}`)
    // button(class='btn card-btn answer-delete-btn' id=`delete-answer-${answer.id}`) Delete

    const data = await res.json()
    if (data.message === 'Success') {
        const answerCard = document.getElementById(`answer-card-${answerId}`)
        answerCard.remove()


    } else {

    }






})

editInputBody.value = bodyEle.innerText;

        submitBtn.addEventListener('click', async (submitEvent) => {
            submitEvent.preventDefault()
            const body = document.getElementById(`${answerId }-edit-body`).value



            const res = await fetch(`/answers/${answerId }`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body,
                    questionId
                })
            })

            const data = await res.json()
            if (data.message === 'Success') {
                // console.log(data)
                bodyEle.innerHTML = data.answer.body
                form.classList.add('hidden')
                submitBtn.classList.add('hidden')
                bodyEle.classList.remove('hidden')
            } else {
                // create elements with error message
            }
