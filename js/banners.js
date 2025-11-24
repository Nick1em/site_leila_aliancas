



const carrossel = document.querySelector('.carrossel');
const btnVolt = document.querySelector('.btn-volt');
const btnProx = document.querySelector('.btn-prox');
const todosSlides = document.querySelectorAll('.produto-principal');

let slideAtual = 0;

function atualizarCarrossel() {
  const deslocamento = -slideAtual * 100;
  carrossel.style.transform = `translateX(${deslocamento}%)`;
}

btnProx.addEventListener('click', () => {
  slideAtual = (slideAtual + 1) % todosSlides.length;
  atualizarCarrossel();
});

btnVolt.addEventListener('click', () => {
  slideAtual = (slideAtual - 1 + todosSlides.length) % todosSlides.length;
  atualizarCarrossel();
});

// Auto-slide (opcional)
setInterval(() => {
  slideAtual = (slideAtual + 1) % todosSlides.length;
  atualizarCarrossel();
}, 5000);


