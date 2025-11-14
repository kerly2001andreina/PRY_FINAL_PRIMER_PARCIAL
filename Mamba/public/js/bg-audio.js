(function () {
  const STORAGE_KEY = 'fabuladental_bg_audio';

  function safeQuery(id) { return document.getElementById(id); }

  function init() {
    const audio = safeQuery('bg-audio');
    if (!audio) return; // nada que hacer si no hay elemento

    // configuración segura por defecto
    audio.volume = typeof audio.volume === 'number' ? audio.volume : 0.35;
    audio.loop = true;
    audio.preload = audio.preload || 'auto';

    // Intentar iniciar en silencio (algunos navegadores permiten autoplay si está muteado)
    audio.muted = true;
    audio.play().catch(() => {
      // Autoplay bloqueado: quedará a la espera de interacción
    });

    // Preparar control (si no existe, crear uno y añadirlo al footer o al body)
    let btn = safeQuery('bg-audio-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'bg-audio-toggle';
      btn.type = 'button';
      btn.className = 'bg-audio-toggle';
      // accesibilidad
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Control de reproducción de audio de fondo');
      const place = document.getElementById('footer') || document.querySelector('footer') || document.body;
      place.appendChild(btn);
    }

    // Actualizar estado visual del botón
    function updateButton(isPlaying) {
      btn.textContent = isPlaying ? 'Detener música' : 'Reproducir música';
      btn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    }

    // Aplicar preferencia guardada
    const pref = localStorage.getItem(STORAGE_KEY);
    updateButton(pref === 'playing');

    // Toggle reproducir/pausar
    btn.addEventListener('click', function () {
      const isPlaying = btn.getAttribute('aria-pressed') === 'true';
      if (isPlaying) {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = true;
        localStorage.setItem(STORAGE_KEY, 'paused');
        updateButton(false);
      } else {
        // Intentar reproducir con sonido (esto requiere interacción en muchos navegadores)
        audio.muted = false;
        audio.play().then(() => {
          localStorage.setItem(STORAGE_KEY, 'playing');
          updateButton(true);
        }).catch(err => {
          console.warn('Reproducción con sonido bloqueada:', err);
          // fallback: reproducir en silencio
          audio.muted = true;
          audio.play().catch(() => {});
          updateButton(false);
        });
      }
    });

    // Escuchar la primera interacción global para respetar políticas de autoplay
    function onFirstInteraction() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'playing') {
        audio.muted = false;
        audio.play().then(() => {
          updateButton(true);
        }).catch(err => {
          console.warn('No se pudo reproducir tras interacción:', err);
        });
      }
      // remover listeners una vez se haya producido la primera interacción
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('keydown', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
    }

    document.addEventListener('click', onFirstInteraction, { once: true });
    document.addEventListener('keydown', onFirstInteraction, { once: true });
    document.addEventListener('touchstart', onFirstInteraction, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();