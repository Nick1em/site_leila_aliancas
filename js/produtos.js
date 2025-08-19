
// js/produtos.js

// Formatando valores para BR
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Convertendo strings de preço para número

function valorPreco(preco) {

  if (typeof preco === 'number') return preco;
  let strValor = String(preco).trim().replace(/\s/g, ''); // retirando espaços em branco
  const temVirgula = strValor.includes(',');
  const temPonto = strValor.includes('.');

  if (temVirgula && temPonto) {

    strValor = strValor.replace(/\./g, '').replace('.', ',') //tira os espaços vazios e substitui por . e ,

  } else if (!temVirgula && temPonto) {
    const parte = strValor.split('.') //separa onde tiver ponto
    if (parte.length === 2) {
      const decimal = parte[1];
      if (decimal === 3) strValor = parte.join('') //juntando a string sem caracter entre eles

    } else if (parte.length > 2) {
      strValor = strValor.replace(/\.(?=.*\.)/g, ''); //
    }
  } else if (temVirgula && !temPonto) {
    strValor = strValor.replace(',', '.');
  }
  const n = parseFloat(strValor);
  return isNaN(n) ? 0 : n;
}

//Carregando os produtos na Telas

async function carregarProdutos() {
  try {
    const resp = await fetch('json/produtos.json'); //Trazendo os produtos do Json
    const produtos = await resp.json()

    // Assistindo parametros da URL

    const params = new URLSearchParams(window.location.search); // onde tem ? no HTML ele permite trabalhar
    const tipo = (params.get('tipo') || '').toLocaleLowerCase(); //filtrando pelo "tipo" (casamento,namoro...) selecionado
    const inicio = !params.has('tipo') || params.get('home') === 'true';// se estiver ou clicar em home vai mostrar os mais vendidos // se estiver ou clicar em home vai mostrar os mais vendidos

    let listaProdutos = produtos;

    // filtrando o que vai aparecer na home
    if (inicio) {
      listaProdutos = listaProdutos.filter(produto => produto.maisVendido === true);
      console.log("Produtos filtrados:", listaProdutos);
    }
    // Se clicar em algum dos filtros 
    else if (tipo && tipo !== 'todos') {
      listaProdutos = listaProdutos.filter(produto => (produto.tipo || '').toLowerCase() === tipo);
    }

    // Manipulando o DOM atualizando os títulos de acordo com o "tipo" selecionado
    const h2 = document.querySelector('.titulo h2');
    const p = document.querySelector('.titulo p');

    if (h2 && p) {
      if (inicio) {
        h2.textContent = 'Os Mais Vendidos'
        p.textContent = 'Descubra os Queridinhos dos Nossos Clientes'

      } else if (tipo && tipo !== 'todos') {
        h2.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        p.textContent = 'Veja Nossa Seleção'

      } else {
        h2.textContent = 'Todos os Nossos Produtos';
        p.textContent = '';
      }
    }

    renderizar(listaProdutos)
  } catch (err) {
    console.error('Erro ao Carregar os Produtos :(', err);
    const divProdutos = document.getElementById('produtos-lista');
    if (divProdutos) divProdutos.innerHTML = '<p>Erro ao carregar produtos.</p>';
  }

}

function renderizar(listaProdutos) {
  const container = document.getElementById('produtos-lista')
  if (!container) return;
  container.innerHTML = '';

  console.log("Produtos filtrados:", listaProdutos);
  if (!listaProdutos.length) {
    container.innerHTML = '<p>Nenhum Produto Encontrado!!!</p>'
    return;
  }

  listaProdutos.forEach(produtos => {
    const preco = valorPreco(produtos.preco);
    const parcela = preco / 3;

    const cardProduto = document.createElement('div')
    cardProduto.className = 'produto';
    cardProduto.innerHTML = `
    <img class= "alianca" src="${produtos.imagem}">
    <p>${produtos.nome}</p>
    <h3>${BRL.format(preco)}</h3>
    <p>ou 3x de ${BRL.format(parcela)}</p>
    <button class="btn-vendedor">Fale com Vendedor</button>
    `;

    container.appendChild(cardProduto)

  });
}

document.addEventListener('DOMContentLoaded', carregarProdutos)