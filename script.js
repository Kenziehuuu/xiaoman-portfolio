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
const conversation = document.querySelector("#conversation");
const questionInput = document.querySelector("#question");
const submitButton = previewForm.querySelector('button[type="submit"]');
const resetButton = document.querySelector("#conversation-reset");
const storageKey = "xiaoman-ai-conversation-v2";

let history = [];

try {
  const stored = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
  if (Array.isArray(stored)) history = stored.slice(-10);
} catch {
  history = [];
}

function persistHistory() {
  sessionStorage.setItem(storageKey, JSON.stringify(history.slice(-10)));
}

function createMessage(role, content, extraClass = "") {
  const message = document.createElement("p");
  message.className = `conversation-message conversation-message--${role} ${extraClass}`.trim();
  message.textContent = content;
  conversation.append(message);
  conversation.scrollTop = conversation.scrollHeight;
  return message;
}

function renderHistory() {
  conversation.replaceChildren();
  if (!history.length) {
    const empty = document.createElement("p");
    empty.className = "conversation-empty";
    empty.textContent = "Choose a question or ask your own.";
    conversation.append(empty);
    return;
  }

  history.forEach(({ role, content }) => createMessage(role, content));
}

async function askXiaoman(question) {
  const priorHistory = history.slice(-10);
  if (!history.length) conversation.replaceChildren();

  createMessage("user", question);
  const loadingMessage = createMessage(
    "assistant",
    /[\u3400-\u9fff]/.test(question) ? "正在想…" : "Thinking…",
    "is-loading"
  );

  questionInput.disabled = true;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, history: priorHistory })
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Request failed.");
    }

    loadingMessage.classList.remove("is-loading");
    loadingMessage.textContent = result.answer;
    history = [
      ...priorHistory,
      { role: "user", content: question },
      { role: "assistant", content: result.answer }
    ].slice(-10);
    persistHistory();
  } catch (error) {
    loadingMessage.className = "conversation-message conversation-message--error";
    loadingMessage.textContent = error.message;
  } finally {
    questionInput.disabled = false;
    submitButton.disabled = false;
    questionInput.value = "";
    questionInput.focus();
    conversation.scrollTop = conversation.scrollHeight;
  }
}

previewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = new FormData(previewForm).get("question").trim();
  if (question) askXiaoman(question);
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => askXiaoman(button.dataset.question));
});

resetButton.addEventListener("click", () => {
  history = [];
  sessionStorage.removeItem(storageKey);
  renderHistory();
  questionInput.focus();
});

renderHistory();
