const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const previewForm = document.querySelector("#preview-form");
const previewResponse = document.querySelector("#preview-response");
const questionInput = document.querySelector("#question");
const submitButton = previewForm.querySelector('button[type="submit"]');

async function askXiaoman(question) {
  previewResponse.textContent = /[\u3400-\u9fff]/.test(question)
    ? "正在思考…"
    : "Thinking…";
  previewResponse.classList.add("is-loading");
  questionInput.disabled = true;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Request failed.");
    }

    previewResponse.textContent = result.answer;
  } catch (error) {
    previewResponse.textContent = error.message;
  } finally {
    previewResponse.classList.remove("is-loading");
    questionInput.disabled = false;
    submitButton.disabled = false;
    questionInput.focus();
  }
}

previewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = new FormData(previewForm).get("question").trim();
  if (question) {
    askXiaoman(question);
  } else {
    previewResponse.textContent = "Type a question to start the conversation.";
  }
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    questionInput.value = question;
    askXiaoman(question);
  });
});
