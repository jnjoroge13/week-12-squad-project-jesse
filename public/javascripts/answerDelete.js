// console.log('Hello from your script')

// Find all delete buttons
// add event listener to each button
// send a fetch request to delete the correct post
// remove post from page with successful response

const answerDeleteBtns = document.querySelectorAll('.answer-delete-btn')

for (let i = 0; i < answerDeleteBtns.length; i++) {
    const btn = answerDeleteBtns[i];
    btn.addEventListener('click', async(e) => {
        e.preventDefault()
        const answerId = e.target.id.split('-')[2]
        const res = await fetch(`/answers/${answerId}`, {
            method: 'DELETE'
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
}
