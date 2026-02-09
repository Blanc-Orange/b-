function getConfig(cb) {
  chrome.storage.sync.get(null, cb);
}

function safeText(el) {
  return el ? el.innerText || "" : "";
}

function processCards(config) {
  const cards = document.querySelectorAll(".bili-video-card");

  cards.forEach(card => {
    const title = safeText(card.querySelector(".bili-video-card__info--tit"));
    const up = safeText(card.querySelector(".bili-video-card__info--author"));

    // 屏蔽
    if (config.blockOn) {
      if (config.blockTitle.some(k => title.includes(k)) ||
          config.blockUp.some(k => up.includes(k))) {
        card.style.display = "none";
        return;
      }
    }

    // 跳转提示标记（不隐藏）
    if (config.redirectOn) {
      if (config.redirectTitle.some(k => title.includes(k)) ||
          config.redirectUp.some(k => up.includes(k))) {
        card.style.outline = "3px solid red";
      }
    }
  });
}

function hideShorts(config) {
  if (!config.shortOn) return;
  document.querySelectorAll('[class*="short"]').forEach(el=>{
    el.style.display="none";
  });
}

function checkRedirectPage(config) {
  if (!config.redirectOn) return;

  const desc = document.querySelector(".desc-info-text");
  if (!desc) return;

  const links = desc.innerText.match(/https?:\/\/[^\s]+/g);
  if (links) {
    window.location.replace(links[0]);
  }
}

setInterval(()=>{
  getConfig(config=>{
    processCards(config);
    hideShorts(config);
  });
},2000);

window.addEventListener("load", ()=>{
  getConfig(checkRedirectPage);
});
