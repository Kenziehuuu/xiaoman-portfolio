# Xiaoman Hu — Portfolio, phase one

A framework-free static portfolio prototype based on the six-section website concept.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` — six-section page and content
- `styles.css` — responsive visual system
- `script.js` — subtle entrance effects and AI preview interaction
- `assets/` — images extracted from the supplied presentation

## AI knowledge

- `knowledge/knowledge-base.json` contains the structured public facts and
  personal narrative that will be supplied to the API in phase three.
- `knowledge/assistant-instructions.md` defines voice, evidence and privacy
  boundaries.
- The current Ask interaction is a small local preview. It demonstrates the
  intended personal and professional answer scope without making API calls.
