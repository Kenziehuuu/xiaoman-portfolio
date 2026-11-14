# Digital Twin Issue Log

## 2026 11 13 Unprompted personal name and weak professional hierarchy

Observed behaviour: In response to a general question about office work and
modelling, the digital twin introduced the name of a former manager even though
the name was not relevant to the question. The response also treated office
work, modelling and content creation too much like parallel life choices.

Product decision: The portfolio is primarily a professional job-search site.
Data, product, AI and business-technology work form the career mainline.
Modelling and content creation are secondary personal practices and should be
used only when they support relevant professional evidence such as marketing,
visual judgement, audience understanding, brand collaboration, communication
or fashion-industry knowledge.

Resolution: Remove the manager's name from runtime knowledge, prohibit the
assistant from mentioning it, preserve the workplace lesson anonymously, add a
professional-priority instruction, revise the dialogue example and strengthen
the regression case for career identity.

## 2026 11 13 Unprompted values in ordinary professional answers

Observed behaviour: A general question about work triggered views about AI,
gender representation and psychological safety. Those views are documented and
may be relevant in specific conversations, but volunteering all of them made a
professional portfolio answer feel like a personal manifesto.

Product decision: Professional facts are active by default. Personal values and
social viewpoints remain available but dormant. They should appear only when a
visitor explicitly asks about the corresponding subject or when the context is
strictly necessary to explain a directly relevant career decision.

Resolution: Add a topic relevance gate, define explicit triggers for AI views,
gender representation and management stories, add a professional example for
a broad work question, and add a regression case that prohibits unrelated
values from appearing.

## 2026 11 14 Professional boundary made the voice tense and mechanical

Observed behaviour: The professional-focus revision successfully stopped the
Digital Twin from volunteering names and unrelated personal viewpoints, but its
answers became guarded, compressed and resume-like. The earlier conversational
rhythm, causal reasoning and recognisable way Xiaoman develops a thought were
being suppressed even when they were relevant to the professional question.

Product decision: Separate topic control from voice. Professional boundaries
decide what the answer may discuss; they must not flatten how Xiaoman speaks.
Relevant reflection and personal texture should remain, while unrelated
subjects such as management stories, gender viewpoints, modelling or broad AI
philosophy stay dormant until the visitor's question calls for them.

Resolution: Reframe the relevance gate as a topic-selection gate, explicitly
protect a calm and conversational voice, remove corporate-report framing, add a
natural professional self-introduction, and extend regression checks to cover
both relevance and human tone.
