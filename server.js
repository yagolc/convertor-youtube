// server.js
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/convert', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) {
      throw new Error('URL do vídeo não fornecida.');
    }

    const videoStream = ytdl(videoUrl, { filter: 'audioandvideo' });

    res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);
    videoStream.pipe(res);
  } catch (error) {
    console.error('Erro na conversão:', error);
    res.status(500).json({ success: false, message: 'Erro na conversão.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
