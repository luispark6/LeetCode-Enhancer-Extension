
document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyzeButton');
    const codeInput = document.getElementById('codeInput');
    const promptInput = document.getElementById('promptInput');
    const resultDiv = document.getElementById('result');
    //if we click analyze button, go in here
    analyzeButton.addEventListener('click', async () => {
      //set code and prompt to the string value of the input
      const code = codeInput.value;
      const prompt = promptInput.value;
      // Call the background script to handle API request
      //any listeners will be execute
      chrome.runtime.sendMessage({ code, prompt }, response => {
        //this displays the space_time_complexity from the response from background.js
        //the display is from the result id
        resultDiv.textContent = `Time/Space Complexity: ${response.space_time_Complexity}`;
      });
    });
  });