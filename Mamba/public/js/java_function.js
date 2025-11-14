(function () {
  function runInlineScripts(container) {
    if (!container) return;
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src) return;
      const code = script.textContent;
      if (!code || !code.trim()) return;
      try {
        // Ejecutar el script en el contexto global para que pueda registrar eventos
        new Function(code)();
      } catch (err) {
        console.error('Error al ejecutar script embebido:', err);
      }
    });
  }

  function loadPage(event, url) {
    // Evita error si event no viene o no tiene preventDefault
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    // Determinar URL objetivo
    const targetUrl = url || (event && event.currentTarget && event.currentTarget.getAttribute && event.currentTarget.getAttribute('href')) || '';
    if (!targetUrl) return;

    fetch(targetUrl)
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status + ' ' + response.statusText);
        return response.text();
      })
      .then(html => {
        const main = document.getElementById('main-content') || document.querySelector('main');
        if (main) {
          main.innerHTML = html;

          // Ejecutar scripts inline de la vista cargada (por ejemplo, filtros del portafolio)
          runInlineScripts(main);

          // Si la URL incluye un fragmento (hash), hacer scroll al elemento objetivo
          try {
            const parsed = new URL(targetUrl, location.href);
            const hash = parsed.hash; // incluye '#'
            if (hash) {
              const id = hash.slice(1);
              // esperar un frame para que el contenido esté insertado y layout realizado
              requestAnimationFrame(() => {
                const el = document.getElementById(id) || document.querySelector(id ? `.${id}` : null);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
            }
          } catch (e) {
            // Si targetUrl no es parseable por URL, ignorar
          }

          // Avisar a componentes interesados que una vista fue cargada dinámicamente
          document.dispatchEvent(new CustomEvent('view:loaded', {
            detail: {
              url: targetUrl,
              container: main
            }
          }));
        } else {
          console.warn('Elemento <main> no encontrado para insertar la página.');
        }
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }

  // Exponer la función globalmente para que los enlaces con onclick sigan funcionando
  window.loadPage = loadPage;

  // Delegación de eventos y carga inicial cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function () {
    // Delegar clics en enlaces que apunten a ./view/
    document.body.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && href.startsWith('./view/')) {
        loadPage(e, href);
      }
    });

    // Cargar la página inicial
    loadPage({ preventDefault: function () {} }, './view/home.html');
  });
})();
