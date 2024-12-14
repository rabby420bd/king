<head>
  <link href="https://cdn.jsdelivr.net/npm/video.js/dist/video-js.css" rel="stylesheet">
</head>
<body>

  <h1>Live Sports Streams</h1>

  <div id="streams"></div>

  <script src="https://cdn.jsdelivr.net/npm/video.js/dist/video.min.js"></script>

  <script>
    fetch('channels.json')  // Adjust if your JSON file is located elsewhere
      .then(response => response.json())
      .then(data => {
        const streamsContainer = document.getElementById('streams');
        
        data.channels.forEach(channel => {
          const channelDiv = document.createElement('div');
          channelDiv.style.marginBottom = '20px';
          
          const logo = document.createElement('img');
          logo.src = channel.logo;
          logo.alt = channel.name;
          logo.style.maxWidth = '200px';
          channelDiv.appendChild(logo);
          
          const name = document.createElement('h2');
          name.innerText = channel.name;
          channelDiv.appendChild(name);
          
          const videoPlayerDiv = document.createElement('div');
          const videoPlayer = document.createElement('video');
          videoPlayer.classList.add('video-js');
          videoPlayer.setAttribute('controls', true);
          videoPlayer.setAttribute('width', '640');
          videoPlayer.setAttribute('height', '360');
          videoPlayer.setAttribute('data-setup', '{}');
          videoPlayer.innerHTML = `<source src="${channel.link}" type="application/x-mpegURL">`;
          videoPlayerDiv.appendChild(videoPlayer);

          channelDiv.appendChild(videoPlayerDiv);

          streamsContainer.appendChild(channelDiv);

          // Initialize Video.js
          video.js(videoPlayer);
        });
      })
      .catch(error => console.error('Error loading streams:', error));
  </script>

</body>
