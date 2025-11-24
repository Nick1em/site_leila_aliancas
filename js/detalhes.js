


const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

async function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  const resp = await fetch('json/produtos.json')
  const produtos = await resp.json()
  const produto = produtos.find(p => p.id == id)

  if (!produto) {
    document.body.innerHTML = '<p>Produto não encontrado!</p>'
    return
  }

  document.getElementById('nome-produto').textContent = produto.nome
  document.getElementById('preco').textContent = BRL.format(produto.preco)
  document.getElementById('descricao').textContent = produto.descricao || ''

  let galeria = produto.galeria || [produto.imagem]
  const imgPrincipal = document.getElementById('imagem-principal')
  const miniaturas = document.getElementById('miniaturas')

  imgPrincipal.src = galeria[0]
  miniaturas.innerHTML = ''

  galeria.forEach(img => {
    const mini = document.createElement('img')
    mini.src = img
    mini.className = 'miniatura'
    mini.addEventListener('click', () => {
      imgPrincipal.src = img
    })
    miniaturas.appendChild(mini)
  })

  document.getElementById('btn-whats').addEventListener('click', () => {
    const mensagem = `Olá! Tenho interesse na aliança: ${produto.nome}`
    window.open(`https://wa.me/55DDDNUMERO?text=${encodeURIComponent(mensagem)}`)
  })
}

document.addEventListener('DOMContentLoaded', carregarDetalhes)
