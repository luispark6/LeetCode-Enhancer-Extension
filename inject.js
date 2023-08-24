//here i have access to html contents of leetcode website
window.addEventListener('load', function() {
    //get current url
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    //parsing the url
    const problemsIndex = urlParts.indexOf('problems');
    if (problemsIndex !== -1 && problemsIndex + 1 < urlParts.length) {
        const problemName = urlParts[problemsIndex + 1];
        //after parsing the url, pass the problem name to find the youtube id
        findYoutubeID(problemName);
    } else {
        console.log('Problem name not found in URL.');
    }
    function findYoutubeID(problem) {
        const apiKey = 'YOUR YOUTUBE API KEY'; 
        //use api key and problem name to search for resuts on youtube
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=Leetcode: ${problem}`;
        fetch(apiUrl)
        //convert response to a json file
        .then(response => response.json())
        //parse the data and inject the data into the solutions tab
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId; //parse the first suggested video
                // Wait for the target element to exist before injecting the video player
                const observer = new MutationObserver(() => {
                    const element = document.querySelector(".relative.flex.w-full.flex-col");
                    if (element) {
                        observer.disconnect(); // Disconnect the observer once the element is found
                        inject(videoId, element); //call the inject function with the target element and videoid
                    }
                });
                //this observes for changes in the DOM structure
                observer.observe(document.body, { childList: true, subtree: true });
            } else {
                console.log('No YouTube videos found for the problem.');
            }
        })
        .catch(error => {
            console.error('Error fetching YouTube data:', error);
        });
    }
    function inject(id, targetElement) {
        //create a video object and control design
        const videoPlayer = document.createElement('iframe');
        videoPlayer.src = `https://www.youtube.com/embed/${id}`;
        videoPlayer.width = '460';
        videoPlayer.height = '350';
        videoPlayer.frameBorder = '0';
        videoPlayer.allowFullscreen = true;
        //inject the video object as the parent node of targetElement. This will inject the video just before
        //the element
        targetElement.parentNode.insertBefore(videoPlayer, targetElement);
    }

    // Wait for the description to load in a LeetCode question
    const observer = new MutationObserver(() => {
    const descriptionDiv = document.querySelector('div.xFUwe[data-track-load="description_content"]');
    //onces descriptionDiv exists
    if (descriptionDiv && descriptionDiv.textContent) {
        //trim the description to get rid of white space and send the prdescriptionompt the background.js
        const description =descriptionDiv.textContent.trim();
        chrome.runtime.sendMessage({ description });
        // Disconnect the observer once the descriptionis found
        observer.disconnect();
    }
    });
     // Observe changes in the document's body
    observer.observe(document.body, { childList: true, subtree: true });
});
