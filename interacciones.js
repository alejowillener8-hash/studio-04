const cabecera = document.querySelector('#cabecera-principal');
let posicionAnterior = window.scrollY;
let esperando = false;

function actualizarCabecera() {
  const posicionActual = window.scrollY;
  const bajando = posicionActual > posicionAnterior;
  const recorrioSuficiente = Math.abs(posicionActual - posicionAnterior) > 5;

  if (cabecera && recorrioSuficiente) {
    cabecera.classList.toggle('cabecera-oculta', bajando && posicionActual > 120);
    cabecera.classList.toggle('cabecera-compacta', !bajando && posicionActual > 120);
    if (posicionActual < 40) cabecera.classList.remove('cabecera-compacta');
    posicionAnterior = posicionActual;
  }
  esperando = false;
}

window.addEventListener('scroll', () => {
  if (!esperando) {
    window.requestAnimationFrame(actualizarCabecera);
    esperando = true;
  }
}, { passive: true });

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) {
      evento.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.selector-talles button').forEach((boton) => {
  boton.addEventListener('click', () => {
    boton.parentElement.querySelectorAll('button').forEach((opcion) => opcion.classList.remove('activo'));
    boton.classList.add('activo');
  });
});
