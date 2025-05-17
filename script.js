{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.querySelectorAll('.sound').forEach(soundDiv => \{\
  const playBtn = soundDiv.querySelector('.play');\
  const audioFile = playBtn.getAttribute('data-audio');\
  const progress = soundDiv.querySelector('.progress');\
  const volume = soundDiv.querySelector('.volume');\
  let audio = new Audio(audioFile + '.mp3');\
  let isPlaying = false;\
\
  // Play/Pause toggle\
  playBtn.addEventListener('click', () => \{\
    if (audio.paused) \{\
      audio.play();\
      playBtn.textContent = '\uc0\u9208  Pause';\
      isPlaying = true;\
    \} else \{\
      audio.pause();\
      playBtn.textContent = playBtn.dataset.originalLabel || playBtn.textContent;\
      isPlaying = false;\
    \}\
  \});\
\
  // Store original label for restoring\
  if (!playBtn.dataset.originalLabel) \{\
    playBtn.dataset.originalLabel = playBtn.textContent;\
  \}\
\
  // Update progress bar as audio plays\
  audio.addEventListener('timeupdate', () => \{\
    if (audio.duration) \{\
      progress.value = (audio.currentTime / audio.duration) * 100;\
    \}\
  \});\
\
  // Seek when progress bar is changed\
  progress.addEventListener('input', () => \{\
    if (audio.duration) \{\
      audio.currentTime = (progress.value / 100) * audio.duration;\
    \}\
  \});\
\
  // Volume control\
  volume.addEventListener('input', () => \{\
    audio.volume = volume.value;\
  \});\
\
  // Reset button and progress bar when audio ends\
  audio.addEventListener('ended', () => \{\
    playBtn.textContent = playBtn.dataset.originalLabel;\
    progress.value = 0;\
    isPlaying = false;\
  \});\
\
  // If user clicks another button, pause all other audios\
  playBtn.addEventListener('click', () => \{\
    document.querySelectorAll('.sound').forEach(otherDiv => \{\
      if (otherDiv !== soundDiv) \{\
        const otherBtn = otherDiv.querySelector('.play');\
        const otherAudioFile = otherBtn.getAttribute('data-audio');\
        if (otherAudioFile) \{\
          let otherAudio = new Audio(otherAudioFile + '.mp3');\
          otherAudio.pause();\
          otherBtn.textContent = otherBtn.dataset.originalLabel;\
        \}\
      \}\
    \});\
  \});\
\});\
}