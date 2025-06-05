# 🎰 BetterJackpot 

Verbessere deine Jackpot.de-Erfahrung mit Autoklicker und so 

## 🚀 Funktionen

- 🖥️ Anzeige des Kontostandes 💰 (schon geil)
- 🚨 Sticker-Päckchen werden automatisch geöffnet  (sehr geil)
- 🤫 jackpot.de Tabs ist immer stumm 🔇 (kein Stress)

## 🧑‍💻 Installation

- Firefox: 
    - temporär: about:debugging#/runtime/this-firefox öffnen, dort "Temporäres Add-On laden..."
    - signiert: t.b.d.
- Chrome:
    - t.b.d.

## Entwicklung

Wir nutzen Vite https://vite.dev/, um mehrere content scripts benutzen zu können.
🚨🚨🚨 Daher nach jeder Änderung neu bauen, bevor die Erweiterung installiert wird.

- Setup 
    - hier im BetterJackpot-Ordner 'npm init -y' und dann 'npm install --save-dev vite'
- Ablauf
    - hier im Ordner bauen mit 'npx vite build'
    - dann Erweiterung dist/manifest.json installieren

## 🧱 Projektstruktur

- `src/` – Quellcode der Erweiterung
- `public/` – Manifest und Icons
- `vite.config.js` – Vite-Build-Konfiguration