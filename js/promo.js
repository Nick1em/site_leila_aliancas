

const promo = document.querySelector('.promo');
const cabecalho = document.querySelector('.cabecalho');
let ultimaPosicaoScroll = 0;

window.addEventListener('scroll', () => {
  const posicaoAtual = window.scrollY;

  if (posicaoAtual > ultimaPosicaoScroll && posicaoAtual > 50) {
    // Rolando para baixo
    promo.classList.add('oculta');
    cabecalho.classList.add('compacto');
  } else {
    // Rolando para cima ou voltou ao topo
    promo.classList.remove('oculta');
    cabecalho.classList.remove('compacto');
  }

  ultimaPosicaoScroll = posicaoAtual;
});

window.addEventListener("scroll", function() {
  const cabecalho = document.querySelector(".cabecalho");

  if (window.scrollY > 50) {
    cabecalho.classList.add("reduzido");
  } else {
    cabecalho.classList.remove("reduzido");
  }
});