


// js/detalhes.js
// Página de detalhes que carrega produto pelo id na URL
// Requisitos: json/produtos.json contendo objetos com id, nome, preco, imagem, galeria (opcional), descricao (opcional)

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// tentativa simples de converter string/number em float (reaproveita lógica similar ao seu valorPreco)


async function carregarDetalhes(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // se quiser, coloque aqui o número de whatsapp real (sem + ou traço), ex: 5511999999999
  const WHATS_NUMBER = '55DDDNÚMERO';

  try {
    const resp = await fetch('json/produtos.json');
    if (!resp.ok) throw new Error('Erro ao buscar JSON: ' + resp.status);
    const produtos = await resp.json();

    const produto = produtos.find(p => String(p.id) === String(id));

    if (!produto) {
      document.body.innerHTML = '<main style="padding:2rem"><p>Produto não encontrado. Volte para a lista de produtos.</p></main>';
      return;
    }

    // elementos
    const nomeEl = document.getElementById('nome-produto');
    const precoEl = document.getElementById('preco');
    const parcelasEl = document.getElementById('parcelas');
    const descricaoEl = document.getElementById('descricao');
    const imgPrincipal = document.getElementById('imagem-principal');
    const miniaturasWrap = document.getElementById('miniaturas');
    const detalhesLista = document.getElementById('detalhes-lista');
    const tempoProducao = document.getElementById('tempo-producao');

    // dados
    nomeEl.textContent = produto.nome || 'Produto';
    const precoNum = parsePreco(produto.preco);
    precoEl.textContent = BRL.format(precoNum);
    parcelasEl.textContent = `ou 3x de ${BRL.format(p/3)}`;

    descricaoEl.textContent = produto.descricao || 'Descrição não informada.';

    // detalhes extras (opcional)
    detalhesLista.innerHTML = '';
    if (produto.garantia) {
      const li = document.createElement('li');
      li.textContent = `Garantia: ${produto.garantia}`;
      detalhesLista.appendChild(li);
    }
    if (produto.tempoEntrega) {
      const li = document.createElement('li');
      li.textContent = `Tempo de produção: ${produto.tempoEntrega}`;
      detalhesLista.appendChild(li);
      tempoProducao.textContent = `Produção estimada: ${produto.tempoEntrega}`;
    }
    if (produto.material) {
      const li = document.createElement('li');
      li.textContent = `Material: ${produto.material}`;
      detalhesLista.appendChild(li);
    }

    // galeria (fallback para imagem principal)
    const galeria = (produto.galeria && produto.galeria.length) ? produto.galeria : [produto.imagem];
    imgPrincipal.src = galeria[0];
    imgPrincipal.alt = produto.nome;

    miniaturasWrap.innerHTML = '';
    galeria.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = produto.nome + ' - foto ' + (i+1);
      img.className = (i === 0) ? 'selected' : '';
      img.tabIndex = 0;
      img.addEventListener('click', () => {
        imgPrincipal.src = src;
        // atualizar selected
        miniaturasWrap.querySelectorAll('img').forEach(n => n.classList.remove('selected'));
        img.classList.add('selected');
      });
      // também permitir seleção por teclado (Enter)
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
      miniaturasWrap.appendChild(img);
    });

    // Botões
    const btnWhats = document.getElementById('btn-whats');
    btnWhats.addEventListener('click', () => {
      const mensagem = `Olá! Gostaria de informações sobre a aliança: ${produto.nome} (ID: ${produto.id}).`;
      // abre WhatsApp web / mobile
      const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank'); //ESSE BOTÃO SERÁ DE COMPRAR 
    });

    const btnOrc = document.getElementById('btn-orcamento');
    btnOrc.addEventListener('click', () => { //ESSE SERÁ DE INFORMAÇÕES PELO WHATS APP
      // exemplo: abrir modal ou redirecionar para formulário de orçamento
      // por enquanto, vamos abrir o WhatsApp com mensagem de orçamento
      const msg = `Olá! Gostaria de solicitar orçamento para a aliança: ${produto.nome} (ID: ${produto.id}).`;
      window.open(`https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });

  } catch (err) {
    console.error(err);
    document.body.innerHTML = `<main style="padding:2rem"><p>Erro ao carregar os detalhes do produto.</p></main>`;
  }
}
