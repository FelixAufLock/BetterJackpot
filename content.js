// const runtime = chrome.runtime && chrome.runtime.sendMessage ? chrome.runtime : browser.runtime;

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_BALANCE") {
    const balanceElement = document.querySelector("jps-digit-counter.ng-star-inserted");
    const balance = balanceElement ? balanceElement.textContent.trim() : "Kein Kontostand gefunden";
    sendResponse({ balance });
  }
});

// "Open Packs" & "Collect Cards" are the same button
// every new button's class has this prefix and 2-3 digits like 69 or 420 
const OPEN_PACKS_BUTTON_CLASS_PREFIX = "ng-tns-c4084794385-";

// Prüft, ob ein Element eine passende Klasse hat
function isMatchingButton(el) {
  if (!(el instanceof HTMLButtonElement)) return false;

  for (const cls of el.classList) {
    if (cls.startsWith(OPEN_PACKS_BUTTON_CLASS_PREFIX)) return true;
  }

  return false;
}

// Klicken, sobald ein passender Button gefunden wird
function tryClickButtonInSubtree(node) {
  const buttons = node.querySelectorAll?.('button') || [];
  for (const btn of buttons) {
    if (isMatchingButton(btn)) {
      console.log("Auto-Clicker: Button gefunden und geklickt");
      btn.click();
      return;
    }
  }

  // Auch direkt prüfen, falls `node` selbst schon ein passender Button ist
  if (isMatchingButton(node)) {
    console.log("Auto-Clicker: Einzelner Button gefunden und geklickt");
    node.click();
  }
}

// DOM-Änderungen beobachten
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      tryClickButtonInSubtree(addedNode);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Falls Button schon beim Start existiert (nicht erst dynamisch)
tryClickButtonInSubtree(document.body);
