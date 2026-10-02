# WA Games

A creator-only console for building hidden-prompt games you play **inside a WhatsApp chat**. The app never runs the game and players never open it — it generates the game and hands you copy-ready messages.

## Modes
- **Pick a Number** — numbers 1–N each hide a prompt. Send the intro, they pick blind, you reveal the full locked list so they know nothing was made up on the spot.
- **Random Round** — one message deals the prompts in a shuffled order, no number game.
- **Custom Mix** — choose the exact prompt types, then build the list.

## Features
- AI generation from a personalised brief (audience, intensity, language: English / isiZulu / Afrikaans / mixed), with per-prompt **regenerate** and **shift tone**.
- Genuinely shuffled number→prompt mapping each game.
- **Lock ID** — a fingerprint of the list, sent with the intro and repeated on the reveal as a "locked before you picked" trust signal. It refreshes if you edit a prompt.
- Copy-ready messages: intro, full-list reveal, single-number lookup, and remaining numbers — formatted with WhatsApp bold/italic, with an optional saved number for direct `wa.me` sends.
- Saved games stored on-device. Built-in prompt bank works with no key.

## AI key
Paste your own Anthropic API key in **Settings** (stored on this device only). A browser-held key is fine for personal use. To share the app, set a **Proxy URL** instead — it replaces the direct call and the key, so a hosted endpoint (e.g. a .NET minimal API) can hold the secret.

## Run
Serve this folder with any static server: `python -m http.server 8080`, VS Code Live Server, or IIS.
