import  { useState } from 'react';
import YouTube from 'react-youtube';

import { TextField } from '@mui/material';

// Add the function to extract video id here 🙋‍♀️
function extractVideoId(url: string) {
  if (!url) return ''; // If URL is empty return an empty string

  const videoId = url.split('v=')[1];
  if (!videoId) return ''; // If no videoId is found return an empty string

  const ampersandPosition = videoId.indexOf('&');
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }

  return videoId;
}

function Video() {

  // YouTube
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');



  return (
    <div>
      <div className="youtube">
        {/* Add the YouTube component and input field here 🙋‍♀️ */}
        {/* <input className='youtube-input' type="text" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="Enter YouTube url" /> */}
        <TextField
          id="standard-basic"
          label="Enter YouTube URL for BGM"
          variant="standard"
          className="youtube-input"
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder=" "
        />
        <YouTube
          className="youtube-frame"
          videoId={extractVideoId(youtubeUrl)}
          opts={{ height: '390', width: '640', playerVars: { autoplay: 0 } }}
        />
      </div>
    </div>
  );
}

export default Video;
