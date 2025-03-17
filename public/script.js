fetch('/api/sunburst')
  .then(response => response.json())
  .then(data => {
    const trace = {
      type: 'sunburst',
      labels: data.labels,
      parents: data.parents,
      values: data.values,
      customdata: data.customdata,
      hovertemplate: '<b>%{label}</b><br>%{customdata}<br>Deputados: %{value}<extra></extra>',
      branchvalues: 'total',
      
      // Aqui você controla o que exibe nos rótulos do gráfico
      textinfo: 'label+value', // Mostra o nome e o número de deputados
      insidetextorientation: 'radial'
    };

    const layout = {
      title: 'Composição da Bancada Evangélica da ALEPE',
      margin: { l: 0, r: 0, b: 0, t: 50 },
      height: 250
    };

    Plotly.newPlot('sunburst-graph', [trace], layout);
  })
  .catch(error => console.error('Erro ao carregar dados:', error));

  // Faz requisição para a API que retorna os dados dos deputados
fetch('/api/cards')
  .then(response => response.json()) // Converte resposta para JSON
  .then(deputados => {
    const container = document.getElementById("cards-container");

    // Percorre a lista de deputados e cria os cartões dinamicamente
    deputados.forEach(dep => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${dep.foto}" alt="${dep.nome}" class="card-img">
        <div class="card-content">
          <h3>${dep.nome}</h3>
          <p><strong>Partido:</strong> ${dep.partido}</p>
          <p>"${dep.citacao}"</p>
          <p>"${dep.descricao}"</p>
          <p><strong>Projetos:</strong> ${dep.projetos.join(", ")}</p>
        </div>
      `;

      container.appendChild(card);
  });
})
.catch(error => console.error('Erro ao carregar os cartões:', error));
