const questionEditBtn = document.getElementById(".answer-edit-btn");

// textarea(type="textarea" cols="70" rows="10" name="body" value=answer.body id=`${answer.id}-edit-body`)

for (let i = 0; i < answerEditBtns.length; i++) {
  const btn = answerEditBtns[i];
  btn.addEventListener("click", (e) => {
    const answerId = e.target.id.split("-")[2];
    const form = document.getElementById(`edit-form-${answerId}`);
    const bodyEle = document.getElementById(`${answerId}-body`);
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