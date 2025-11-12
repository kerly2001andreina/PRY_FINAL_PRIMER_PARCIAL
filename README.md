# Fábula Dental — Sitio web

Descripción
-----------

Este repositorio contiene la plantilla del sitio web "Fábula Dental", una página informativa orientada a odontología con un enfoque en odontopediatría (odontología pediátrica). El proyecto está basado en la plantilla "Mamba" de BootstrapMade y sirve como demostración dinámica del contenido y el diseño.

Clonar el repositorio (Git Bash)
-------------------------------

Para clonar el repositorio de forma rápida usando Git Bash, abre una terminal y ejecuta:

```bash
git clone https://github.com/kerly2001andreina/PRY_FINAL_PRIMER_PARCIAL.git
```

Esto descargará el repositorio en una carpeta llamada `PRY_FINAL_PRIMER_PARCIAL` en tu máquina.

Estructura y carpeta principal
------------------------------

El contenido principal del sitio está dentro de la carpeta `Mamba`. Algunas rutas importantes:

- `Mamba/index.html` — Página principal del sitio.
- `Mamba/public/vendor/template/assets/css/main.css` — Hoja de estilos principal.
- `Mamba/public/vendor/template/assets/js/main.js` — JavaScript principal.

Arrancar el sitio localmente (rápido)
-----------------------------------

Una forma sencilla de probar el sitio localmente es iniciar un servidor HTTP estático desde la carpeta `Mamba`. Desde la raíz del repo:

```bash
cd PRY_FINAL_PRIMER_PARCIAL/Mamba
python3 -m http.server 8000
# luego abre en tu navegador: http://localhost:8000/index.html
```

Notas y recomendaciones
-----------------------

- Usa siempre el servidor (http://...) en lugar de abrir el archivo con `file://` para evitar problemas con rutas relativas y comportamiento del navegador.
- Si el CSS no se aplica, abre las herramientas de desarrollador (F12) → pestaña Network, marca "Disable cache" y recarga (Ctrl+F5). Verifica que `main.css` y `bootstrap.min.css` carguen con código 200.
- Si vas a publicar en GitHub Pages u otro host que sirva desde una subcarpeta, ajusta las rutas relativas (o añade un `<base href="/ruta/">` en el `<head>`) para que los recursos apunten correctamente.

Contribuir
----------

Si quieres contribuir con mejoras (contenido, imágenes, correcciones), crea un fork del repositorio, realiza tus cambios y abre un pull request. Para cambios simples:

```bash
# después de clonar
git checkout -b mejora-descripcion
# hacer cambios
git add .
git commit -m "Mejora: descripción de la sección X"
git push origin mejora-descripcion
```
 
Créditos y licencia
-------------------

La plantilla base es "Mamba" de BootstrapMade (https://bootstrapmade.com/mamba-one-page-bootstrap-template-free/). Revisa la licencia de la plantilla si planeas publicar el sitio en producción.

Contacto
--------

Para dudas sobre este repositorio contacta al propietario en GitHub: https://github.com/kerly2001andreina

------------------------------------------------------------
