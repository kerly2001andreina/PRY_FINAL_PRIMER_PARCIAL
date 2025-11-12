(function () {
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
        } else {
          console.warn('Elemento <main> no encontrado para insertar la página.');
        }
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }

<<<<<<< HEAD
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('main').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
        
=======
  // Exponer la función globalmente para que los enlaces con onclick sigan funcionando
  window.loadPage = loadPage;
>>>>>>> origin/main

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
