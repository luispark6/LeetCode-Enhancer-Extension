// This is a simplified example; you should secure your API keys properly
const apiKey = 'Your API Key';
//this is listening for when popup.js sends a message to any listeners
//request represents the data sent over, sender represents information about
//the sender 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //if code and prompt not null, proceed
  if (request.code && request.prompt) {
    const model = 'text-davinci-003'; // the engine used
    const apiUrl = `https://api.openai.com/v1/engines/${model}/completions`;    
    //post request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `What is the time and space complexity with this function:${request.code}.\n\nAnd this prompt: ${request.prompt}. If the
        code makes no sense or the prompt makes no sense, just output "input a valid prompt/code" `,
        max_tokens: 100 // Adjust as needed
      })
    })
    //.then parses http response as json
    .then(response => response.json())
    //result of this parsing (the parsed JSON data) becomes the 
    //value that is passed to the next .then() callback in the chain.
    //process the parsed json data
    .then(data => {
      const space_time_Complexity = data.choices[0].text;
      sendResponse({ space_time_Complexity });
    })
    .catch(error => {
      console.error(error);
      sendResponse({ timeComplexity: 'Error' });
    });
    return true; // Keep the messaging channel open for sendResponse
  }
});