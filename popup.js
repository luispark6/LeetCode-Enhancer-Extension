document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyzeButton');
    const codeInput = document.getElementById('codeInput');
    const promptInput = document.getElementById('promptInput');
    const resultDiv = document.getElementById('result');
    //get the currentUrl from the local storage
    chrome.storage.local.get(['currentUrl'], function(result) {
      //if the current url doesnt include leet.com/problems/, the remove the description and set
      //prompt value to none. This is because if we are not on leetcode, there is no prompt to be used
      //for the code so we need the user to manually input wanted prompt
      if (!result.currentUrl.includes("leetcode.com/problems/")){
        chrome.storage.local.remove('description');
        promptInput.value = "";
      }
      else{
        // else, if we are in leetcode problem section, get the current description from the local
        //file then set the prompt input value to the description
          chrome.storage.local.get(['description'], function(result) {
          if (result.description) {
            promptInput.value = result.description;
          }
        });
      }
    });
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

