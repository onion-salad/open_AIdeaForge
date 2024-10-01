chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageInfo") {
    sendResponse({
      url: window.location.href,
      title: document.title
    });
  }
});

// この部分は後でAIdeaForgeの機能を拡張する際に使用します