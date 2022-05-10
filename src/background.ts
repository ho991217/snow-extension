// This file is ran as a background script

const downloadUrls: string[] = [];

chrome.webRequest.onSendHeaders.addListener(
  (res) => {
    if (!downloadUrls.includes(res.url)) {
      downloadUrls.push(res.url + "#t=0.5");
    }
    console.log(downloadUrls);
  },
  {
    urls: ["*://*/*"],
    types: ["media"],
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "download-url") {
    sendResponse(downloadUrls);
  }
});
