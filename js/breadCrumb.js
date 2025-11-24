

function gerarBreadcrumb() {
  const breadcrumb = document.getElementById("breadcrumb");

  const partes = window.location.pathname.split("/").filter(x => x);

  let caminhoAcumulado = "";
  const htmlPartes = partes.map((parte, i) => {
    
    caminhoAcumulado += `/${parte}`;
    
    const nomeFormatado = parte
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    if (i === partes.length - 1) {
      return `<span>${nomeFormatado}</span>`;
    }

    return `<a href="${caminhoAcumulado}">${nomeFormatado}</a> › `;
  }).join("");

  breadcrumb.innerHTML = `<a href="/">Home</a> › ${htmlPartes}`;
}

gerarBreadcrumb();