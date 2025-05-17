document.querySelectorAll('.sound').forEach(soundDiv => {
  const playBtn = soundDiv.querySelector('.play');
  const audioFile = playBtn.getAttribute('data-audio');
  const progress = soundDiv.querySelector('.progress');
  const volume = soundDiv.querySelector('.volume');
  let audio = new Audio(audioFile + '.mp3');
  let isPlaying = false;

  // Play/Pause toggle
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸ Pause';
      isPlaying = true;
    } else {
      audio.pause();
      playBtn.textContent = playBtn.dataset.originalLabel || playBtn.textContent;
      isPlaying = false;
    }
  });

  // Store original label for restoring
  if (!playBtn.dataset.originalLabel) {
    playBtn.dataset.originalLabel = playBtn.textContent;
  }

  // Update progress bar as audio plays
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // Seek when progress bar is changed
  progress.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // Volume control
  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });

  // Reset button and progress bar when audio ends
  audio.addEventListener('ended', () => {
    playBtn.textContent = playBtn.dataset.originalLabel;
    progress.value = 0;
    isPlaying = false;
  });

  // If user clicks another button, pause all other audios
  playBtn.addEventListener('click', () => {
    document.querySelectorAll('.sound').forEach(otherDiv => {
      if (otherDiv !== soundDiv) {
        const otherBtn = otherDiv.querySelector('.play');
        const otherAudioFile = otherBtn.getAttribute('data-audio');
        if (otherAudioFile) {
          let otherAudio = new Audio(otherAudioFile + '.mp3');
          otherAudio.pause();
          otherBtn.textContent = otherBtn.dataset.originalLabel;
        }
      }
    });
  });
});
