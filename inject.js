// Get the current URL
const currentUrl = window.location.href;
// Split the URL by "/"
const urlParts = currentUrl.split('/');
// Find the index of the "problems" segment
const problemsIndex = urlParts.indexOf('problems');
// Extract the problem name
if (problemsIndex !== -1 && problemsIndex + 1 < urlParts.length) {
  const problemName = urlParts[problemsIndex + 1];
  console.log('Problem Name:', problemName);
} else {
  console.log('Problem name not found in URL.');
}
function findYoutubeID(problem){
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=Leetcode: ${problem}`;
    // Make an API request to get video results
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        console.log('YouTube Video ID:', videoId);
        // Inject the YouTube video player into the solutions tab
        injectYouTubeVideo(videoId);
        } else {
        console.log('No YouTube videos found for the problem.');
        }
    })
    .catch(error => {
        console.error('Error fetching YouTube data:', error);
    });
}
function inject(id){
    const videoPlayer = document.createElement('iframe');
    videoPlayer.src = `https://www.youtube.com/embed/${id}`;
    videoPlayer.width = '560';
    videoPlayer.height = '315';
    videoPlayer.frameBorder = '0';
    videoPlayer.allowFullscreen = true;
    // Identify the element or container in the solutions tab to inject the video
    const solutionsContainer = document.getElementById('solutions-container'); // Update with the actual element ID

    if (solutionsContainer) {
        solutionsContainer.appendChild(videoPlayer);
    } else {
        console.log('Solutions container not found.');
    }
}