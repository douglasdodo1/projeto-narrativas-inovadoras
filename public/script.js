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


window.onload = function() {
  // Fetch para pegar os dados da API
  fetch('/api/cards')
      .then(response => response.json())
      .then(deputados => {
          const cardsContainer = document.getElementById('cards-container');

          // Itera sobre os dados e cria os cards
          deputados.forEach(deputado => {
              const card = document.createElement('div');
              card.classList.add('card');

              // A função flipCard será chamada ao clicar no card
              card.setAttribute('onclick', 'flipCard(this)');

              const cardInner = document.createElement('div');
              cardInner.classList.add('card-inner');

              // Frente do card
              const cardFront = document.createElement('div');
              cardFront.classList.add('card-front');

              const img = document.createElement('img');
              img.src = deputado.foto; // Foto do deputado
              img.alt = `Foto de ${deputado.nome}`;

              const nome = document.createElement('h3');
              nome.textContent = deputado.nome;

              const partido = document.createElement('p');
              partido.textContent = deputado.partido;

              cardFront.appendChild(img);
              cardFront.appendChild(nome);
              cardFront.appendChild(partido);

              // Verso do card
              const cardBack = document.createElement('div');
              cardBack.classList.add('card-back');

              const descricao = document.createElement('p');
              descricao.textContent = `Descrição: ${deputado.descricao}`;

              const citacao = document.createElement('p');
              citacao.textContent = `Citação: ${deputado.citacao}`;

              const projetos = document.createElement('p');
              projetos.textContent = `Projetos: ${deputado.projetos.join(', ')}`;

              cardBack.appendChild(descricao);
              cardBack.appendChild(citacao);
              cardBack.appendChild(projetos);

              // Adiciona o conteúdo da frente e do verso ao card
              cardInner.appendChild(cardFront);
              cardInner.appendChild(cardBack);
              
              // Adiciona o card completo ao contêiner
              card.appendChild(cardInner);
              cardsContainer.appendChild(card);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar dados dos deputados:', error);
      });
};

// Função para realizar o flip do card ao clicar
function flipCard(card) {
    card.classList.toggle('flipped');
}