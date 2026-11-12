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
