function loadPage(event, url) {
    // Evita que cambie de pagina, sino que se quede en la misma
    event.preventDefault();
    const main = document.getElementById('main-content');
    // main.innerHTML = "<h1>HOLA DESDE SCRIPT</h1>";

    // fetch(url)
    //     .then(response => response.text()) // buscar archivo externo
    //     .then(html => main.innerHTML = html) //mostrar al cliente      
    //     .catch(err => main.innerHTML = err)


    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('main').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });

}