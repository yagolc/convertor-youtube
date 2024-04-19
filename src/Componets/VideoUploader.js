// src/components/VideoUploader.js
import React, { useState } from 'react';
import axios from 'axios';
import './VideoUploader.css';

const VideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleConvertClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/convert', {
        videoUrl,
      }, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'video/mp4' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro na conversão:', error);
    }
  };

  return (
    <div className="video-uploader-container">
      <h2>Converter Vídeo do YouTube para MP4</h2>
      <input
        type="text"
        placeholder="Insira a URL do vídeo do YouTube"
        value={videoUrl}
        onChange={handleUrlChange}
        className="video-url-input"
      />
      <button onClick={handleConvertClick} className="convert-button">
        Converter para MP4 e Baixar
      </button>
    </div>
  );
};

export default VideoUploader;
