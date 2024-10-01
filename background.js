chrome.runtime.onInstalled.addListener(() => {
  console.log('AIdeaForge Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getNote") {
    // Here you would implement the logic to retrieve notes
    // For now, we'll just send a mock response
    sendResponse({note: "This is a sample note for " + request.url});
  }
});