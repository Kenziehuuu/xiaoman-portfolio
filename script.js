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

const previewAnswers = [
  {
    terms: ["france", "paris", "法国", "巴黎", "留学"],
    en: "I came to France to add technical depth to my business background through the ESSEC × CentraleSupélec Data Science & Business Analytics programme. Paris mattered for another reason too: it allowed my analytical ambitions and my long-standing connection to fashion and visual culture to coexist. Moving here was not about abandoning creativity for technology. It was a way to bring the two sides together.",
    zh: "我来法国，是希望通过 ESSEC × CentraleSupélec 的 Data Science & Business Analytics 项目，为自己的商业背景补充真正的数据和技术能力。巴黎对我也有另一层意义：它让我的分析能力、时尚兴趣和创作欲望可以同时存在。来到法国不是为了用技术取代创意，而是为了把这两部分真正结合起来。"
  },
  {
    terms: ["person", "who", "性格", "什么样", "resilien", "坚韧"],
    en: "I see myself as curious, resilient and good at integration. I tend to take lessons from one part of life, refine them and apply them somewhere new—moving between marketing, data products, content and modelling without treating them as separate identities. My confidence grew gradually from learning difficult things, recovering from setbacks and seeing that I could trust myself to keep going.",
    zh: "我觉得自己是一个好奇、坚韧，而且很擅长融合不同经验的人。我经常会把生活中一个领域学到的东西总结出来、继续升级，再带到下一个阶段。市场、数据产品、内容创作和模特工作对我来说并不是互相割裂的身份。我的自信也不是突然出现的，而是来自一次次学习困难的东西、经历失败后重新站起来，并发现自己真的可以信任自己。"
  },
  {
    terms: ["data", "marketing", "技术", "数据", "科技", "转"],
    en: "My move toward data began at SHOCK, a fashion technology startup. Marketing taught me how to understand users and communicate value, but I realised that creativity and intuition alone were not enough for the decisions I wanted to influence. I wanted technical and analytical skills, more proximity to core product decisions, and work that felt more useful than simply encouraging consumption. Seeing very few women in the technical team also made entering technology personally meaningful.",
    zh: "我转向数据的想法是在时尚科技初创公司 SHOCK 工作时形成的。营销让我学会理解用户和传递价值，但我逐渐意识到，仅靠创意和直觉不足以支撑我想参与的商业决策。我希望拥有数据和技术能力，更接近产品的核心决策，也希望自己的工作不只是鼓励消费，而是创造更真实的价值。当时技术团队里几乎没有女性，这也让我第一次非常强烈地想进入技术领域。"
  },
  {
    terms: ["proud", "梦想", "骄傲", "women", "女性"],
    en: "One especially meaningful period for me was my first Clearstream internship. I was trusted to propose and lead ideas, created a company-wide communication project for data products, and worked with Women in DBG on events that helped more people—especially women—understand technology. It felt like the values that had pushed me toward tech were becoming real work. Later, independently delivering data products and receiving user feedback strengthened that confidence.",
    zh: "对我来说特别有意义的一段经历，是在 Clearstream 的第一段实习。我被充分信任，可以主动提出并主导自己的想法。我为数据产品策划了公司范围的传播项目，也和 Women in DBG 合作，让更多人、尤其是女性了解技术。那一刻我觉得，曾经推动我进入科技领域的价值观真的变成了我的工作。后来我开始独立交付数据产品，用户的反馈也让我越来越相信自己的能力。"
  },
  {
    terms: ["work", "project", "dashboard", "职业", "项目"],
    en: "Professionally, I work across data, product and communication. At Clearstream I delivered three Power BI dashboards, worked across the data-product lifecycle and helped reduce one dashboard's refresh time from about 60 seconds to about 2 seconds. My wider experience includes EV charging pricing analysis, product launch, China market strategy and building a 29K+ creator community.",
    zh: "我的职业经历横跨数据、产品和传播。在 Clearstream，我独立交付了三个 Power BI dashboard，参与数据产品的完整生命周期，并把其中一个核心 dashboard 的刷新时间从大约 60 秒优化到 2 秒左右。除此之外，我还做过电动车充电定价分析、数据产品发布、中国市场策略，以及从零经营一个拥有 29K+ 粉丝的内容账号。"
  }
];

function answerPreview(question) {
  const normalized = question.toLowerCase();
  const isChinese = /[\u3400-\u9fff]/.test(question);
  const match = previewAnswers.find(({ terms }) =>
    terms.some((term) => normalized.includes(term.toLowerCase()))
  );
  previewResponse.textContent = match
    ? (isChinese ? match.zh : match.en)
    : (isChinese
      ? "关于这个问题，我现在掌握的信息还不够。你可以问我为什么来法国、为什么从市场转向数据、我的性格，或者我做过的项目。"
      : "I don't have enough information to answer that yet. Try asking why I came to France, why I moved into data, what I am like, or about a professional project.");
}

previewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = new FormData(previewForm).get("question").trim();
  if (question) {
    answerPreview(question);
  } else {
    previewResponse.textContent = "Type a question to preview the interaction.";
  }
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    questionInput.value = question;
    answerPreview(question);
  });
});
