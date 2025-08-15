
async function carregarMaisVendidos() {
  // Faz uma requisição para obter os produtos do arquivo JSON
  // e filtra os que têm maisVendido = true
  const resposta = await fetch('/json/produtos.json');
  const produtos = await resposta.json();

  const container = document.getElementById('mais-vendidos');

  produtos
    .filter(produto => produto.maisVendido) // pega só os que têm maisVendido = true
    .forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('produto');
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.preco}</p>
      `;
      container.appendChild(div);
    });
}

carregarMaisVendidos();