(function () {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('bg-audio-toggle');
  const storageKey = 'fabuladental_bg_audio';

  // Ajustes por defecto
  audio.volume = 0.4; // volumen inicial (0.0 - 1.0)
  audio.loop = true;

  // Intentar autoplay silencioso (algunos navegadores permiten autoplay si está muteado)
  audio.muted = true;
  audio.play().catch(() => {
    // Autoplay bloqueado: queda inactivo hasta interacción
  });

  // Si el usuario ya guardó preferencia, aplicarla
  const pref = localStorage.getItem(storageKey);
  if (pref === 'playing') {
    // intentar activar sonido una vez haya interacción (ver abajo)
    // mostramos estado en el botón
    btn.textContent = '🔊 Detener música';
    btn.setAttribute('aria-pressed', 'true');
  } else {
    btn.textContent = '🔈 Reproducir música';
    btn.setAttribute('aria-pressed', 'false');
  }

  function setPlaying(shouldPlay) {
    if (shouldPlay) {
      // Desmutear y reproducir (requiere interacción del usuario en algunos navegadores)
      audio.muted = false;
      audio.play().then(() => {
        btn.textContent = '🔊 Detener música';
        btn.setAttribute('aria-pressed', 'true');
        localStorage.setItem(storageKey, 'playing');
      }).catch(err => {
        // Si falla (sin interacción), dejamos muted y reproducimos cuando haya interacción
        console.warn('No se pudo reproducir con sonido:', err);
        audio.muted = true;
        audio.play().catch(()=>{});
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
      btn.textContent = '🔈 Reproducir música';
      btn.setAttribute('aria-pressed', 'false');
      localStorage.setItem(storageKey, 'paused');
    }
  }

  // Alternar al hacer click en el botón (esto cuenta como interacción)
  btn.addEventListener('click', function () {
    const isPlaying = btn.getAttribute('aria-pressed') === 'true';
    setPlaying(!isPlaying);
  });

  // También escucha la primera interacción global para intentar desmutear si la preferencia es playing
  function onFirstInteraction() {
    const pref = localStorage.getItem(storageKey);
    if (pref === 'playing') {
      audio.muted = false;
      audio.play().catch(()=>{});
      btn.textContent = '🔊 Detener música';
      btn.setAttribute('aria-pressed', 'true');
    }
    // ya no necesitamos este listener
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('keydown', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }

  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('keydown', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);
})();