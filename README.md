# 🎰 BetterJackpot 

Verbessere deine jackpot.de-Erfahrung mit Autoklicker und so 

## 🚀 Funktionen

- 🖥️ Anzeige des Kontostandes 💰 (schon geil)
- 🚨 Sticker-Päckchen werden automatisch geöffnet (sehr geil)
- 🔇 jackpot.de-Tabs sind immer stumm 🤫 (ganz entspannt)

## ⚙️ Setup

Entwickelt mit [WXT](https://wxt.dev/) 
[WXT Docs](https://wxt.dev/guide/essentials/project-structure.html)

WXT installieren
`npm install wxt --save-dev`

Um für beide Versionen zu bauen
`npm run build`

Jeder Build erzeugt einen `dist` Ordner, der die fertigen Erweiterungen `chrome-mv3` und `firefox-mv3` enthält

## 🧑‍💻 Installation

- Firefox: 
    - temporär: 
        - `about:debugging#/runtime/this-firefox` aufrufen
        - "Temporäres Add-On laden...": `dist/firefox-mv3/manifest.json`
    - signiert: t.b.d.
- Chrome:
    - `chrome://extensions/` aufrufen
    - "Entpackte Erweiterung laden": `dist/chrome-mv3`


