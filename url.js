//js file to constantly send the url the background.js
const currentUrl = window.location.href;
console.log(currentUrl);
chrome.runtime.sendMessage({ currentUrl });