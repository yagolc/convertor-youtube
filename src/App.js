// src/App.js
import React, { useState } from 'react';
import YoutubePlayer from './Componets/YoutubePlayer';
import VideoUploader from './Componets/VideoUploader';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleUpload = (url) => {
    setVideoUrl(url);
    // Lógica para converter o vídeo para MP4 usando youtube-dl
    // Exemplo: youtube-dl -f mp4 -o 'video.mp4' 'url_do_video'
  };

  return (
    <div className="App">
      
      <VideoUploader onUpload={handleUpload} />
      {videoUrl && <YoutubePlayer videoId={videoUrl} />}
    </div>
  );
}

export default App;
