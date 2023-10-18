// 1 - Abra a página em que deseja fazer a extração das URLS e aperte F12 no seu teclado ou clique com o botão direito do mouse e selecione Inspecionar Código Fonte
// 2 - Copie a função abaixo no Console do Navegador e Aperte ENTER

function extractCPFCNPJAndGenerateLinks() {
  // Regex para encontrar números de CPF e CNPJ na página
  const cpfCnpjRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g;

  // Extrai os números de CPF e CNPJ
  const cpfCnpjSet = new Set();
  const pageHtml = document.documentElement.outerHTML;
  let match = cpfCnpjRegex.exec(pageHtml);
  while (match) {
    // Remove a formatação dos números de CPF e CNPJ
    const unformattedCpfCnpj = match[0].replace(/\D/g, '');

    // Adiciona os números de CPF e CNPJ desformatados ao conjunto para eliminar duplicatas
    cpfCnpjSet.add(unformattedCpfCnpj);
    match = cpfCnpjRegex.exec(pageHtml);
  }

  // Gera links para os números de CNPJ desformatados a partir do conjunto
  const links = Array.from(cpfCnpjSet).map((cnpj) => {
    const receitaWSLink = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const minhaReceitaLink = `https://minhareceita.org/${cnpj}`;
    return `<a href="${receitaWSLink}" target="_blank">${receitaWSLink}</a><br><a href="${minhaReceitaLink}" target="_blank">${minhaReceitaLink}</a><br>`;
  });

  // Abre uma nova janela com os links
  const linksString = links.join('\n');
  const newWindow = window.open('', '_blank');
  newWindow.document.write(linksString);
  newWindow.document.close();
}

extractCPFCNPJAndGenerateLinks();
