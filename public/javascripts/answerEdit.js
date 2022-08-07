// div(id=`edit-form-div-${answer.id}`)
//                     form(class='hidden' id=`edit-form-${answer.id}`)
//                                 label Body:
//                                 input(type="textarea" col="40" row="40" name="body" value=answer.body id=`${answer.id}-edit-body`)
//                                 button(class="edit-submit" id=`edit-submit-${answer.id}`) Submit Edit

// button(class="edit-submit hidden" id=`edit-submit-${answer.id}`) Submit Edit

const answerEditBtns = document.querySelectorAll(".answer-edit-btn");

// textarea(type="textarea" cols="70" rows="10" name="body" value=answer.body id=`${answer.id}-edit-body`)

for (let i = 0; i < answerEditBtns.length; i++) {
  const btn = answerEditBtns[i];
  btn.addEventListener("click", (e) => {
    const answerId = e.target.id.split("-")[2];
    const form = document.getElementById(`edit-form-${answerId}`);
    const bodyEle = document.getElementById(`${answerId}-body`);
    const originalValue = bodyEle.innerText;
    const cancelBtn = document.getElementById(`edit-btn-${answerId}`);
    const submitBtn = document.getElementById(`edit-submit-${answerId}`);
    const editInputBody = document.getElementById(`${answerId}-edit-body`);
    // const oldBodyValue = document.getElementById(`${answerId }-edit-body`).innerText
    cancelBtn.innerHTML = "Cancel";

    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
      submitBtn.classList.remove("hidden");
      bodyEle.classList.add("hidden");
      // editInputBody.innerText = oldBodyValue;
    } else {
      form.classList.add("hidden");
      submitBtn.classList.add("hidden");
      bodyEle.classList.remove("hidden");
    }

    editInputBody.value = bodyEle.innerText;
    cancelBtn.addEventListener("click", (e) => {
      cancelBtn.innerHTML = "Edit";
    });
    submitBtn.addEventListener("click", async (submitEvent) => {
      submitEvent.preventDefault();
      const body = document.getElementById(`${answerId}-edit-body`).value;
      if (body === "") body = originalValue;
      cancelBtn.innerHTML = "Edit";

      const res = await fetch(`/answers/${answerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body,
        }),
      });

      const data = await res.json();
      if (data.message === "Success") {
        // console.log(data)
        bodyEle.innerHTML = data.answer.body;
        form.classList.add("hidden");
        submitBtn.classList.add("hidden");
        bodyEle.classList.remove("hidden");
      } else {
        // create elements with error message
      }
    });
  });
}

const newAnswerForm = document.getElementById("create-answer-form")
const newAnswerSubmitBtn = document.getElementById("new-answer-submit");
const newAnswerBody = document.getElementById("new-answer-body");

newAnswerBody.addEventListener("keyup", (e) => {

  if (newAnswerBody.value !== "") {

    if (newAnswerSubmitBtn.classList.contains("hidden")) {
      newAnswerSubmitBtn.classList.remove("hidden");
      newAnswerSubmitBtn.classList.add("show");
    }
  }
  else {
    if (newAnswerSubmitBtn.classList.contains("show")) {
      newAnswerSubmitBtn.classList.remove("show");
      newAnswerSubmitBtn.classList.add("hidden");
      newAnswerForm.classList.add("hidden");
    }
    }
})

// const newAnswerCancelBtn = document.getElementById(`new-answer-cancel`);

// newAnswerCancelBtn.addEventListener("click", (e) => {
//   e.target.stopPropagation();
//   e.target.preventDefault();
//   newAnswerForm.add("hidden");
// });