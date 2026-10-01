# WA Games

A mobile-first WhatsApp Game Generator MVP.

## Included
- Couples, Friends, Trivia, Truth or Dare, Would You Rather, Personality, South Africa and Custom categories
- Question count and style configuration
- Question-type filters
- Generate a game
- Copy formatted questions
- Open WhatsApp with the generated message
- Paste a WhatsApp reply back into the app
- Automatic scoring for questions with predefined answers
- PWA manifest for adding to a phone home screen

## Run
The simplest way to test it is to serve this folder with any static HTTP server.

Examples:
- VS Code Live Server
- `python -m http.server 8080`
- Any IIS/static hosting

Opening `index.html` directly works for most features, but browser security may restrict clipboard/PWA functionality.

## Next production step
Add a backend/AI question-generation endpoint and optional database for custom question packs and saved games. Direct WhatsApp API messaging can be added later; the MVP intentionally uses WhatsApp's share link rather than requiring a WhatsApp Business API setup.
