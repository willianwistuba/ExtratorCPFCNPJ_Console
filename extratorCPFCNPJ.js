// 1 - Abra a página em que deseja fazer a extração das URLS e aperte F12 no seu teclado ou clique com o botão direito do mouse e selecione Inspecionar Código Fonte
// 2 - Copie a função abaixo no Console do Navegador e Aperte ENTER

function extractCPFCNPJAndGenerateLinks() {
  // Regex para encontrar números de CPF e CNPJ na página
  const cpfCnpjRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g;

  // Extrai os números de CPF e CNPJ
  const cpfArray = [];
  const cnpjArray = [];
  const pageHtml = document.documentElement.outerHTML;
  let match = cpfCnpjRegex.exec(pageHtml);
  while (match) {
    // Remove a formatação dos números de CPF e CNPJ
    const unformattedCpfCnpj = match[0].replace(/\D/g, '');

    if (unformattedCpfCnpj.length === 11) { // É um CPF
      cpfArray.push(unformattedCpfCnpj);
    } else if (unformattedCpfCnpj.length === 14) { // É um CNPJ
      cnpjArray.push(unformattedCpfCnpj);
    }
    
    match = cpfCnpjRegex.exec(pageHtml);
  }

  // Gera links apenas para os números de CNPJ
  const cnpjLinks = cnpjArray.map((cnpj) => {
    const receitaWSLink = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const minhaReceitaLink = `https://minhareceita.org/${cnpj}`;
    return `<a href="${receitaWSLink}" target="_blank">${receitaWSLink}</a><br><a href="${minhaReceitaLink}" target="_blank">${minhaReceitaLink}</a><br>`;
  });

  // Abre uma nova janela com os links para CNPJ e exibe os números de CPF
  const cnpjLinksString = cnpjLinks.join('\n');
  const newWindow = window.open('', '_blank');
  newWindow.document.write(cnpjLinksString);
  newWindow.document.write('<h1>Números de CPF:</h1>');
  newWindow.document.write('<ul>');
  for (const cpf of cpfArray) {
    newWindow.document.write(`<li>${cpf}</li>`);
  }
  newWindow.document.write('</ul>');
  newWindow.document.close();
}

extractCPFCNPJAndGenerateLinks();
