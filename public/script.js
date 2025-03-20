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

    // Configuração para remover a barra de ferramentas
    const config = {
      displayModeBar: false, // Remove os botões de interação
    };

    Plotly.newPlot('sunburst-graph', [trace], layout);
  })
  .catch(error => console.error('Erro ao carregar dados:', error));

// Função que insere os cards no container
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

//----------------------------------------------------------------------------------------------------

fetch('/api/votos')
      .then(response => response.json())
      .then(data => {
        const anos = data.anos;
        const partidos = data.partidos;

        // Função para criar o gráfico com base no ano selecionado
        function criarGrafico(anoSelecionado) {
          let indices = [];
          if (anoSelecionado === "todos") {
            indices = anos.map((_, index) => index); // Todos os anos
          } else {
            indices = [anos.indexOf(anoSelecionado)]; // Índice do ano selecionado
          }

          // Preparar os dados para o gráfico
          const traces = partidos.map(partido => ({
            x: indices.map(i => anos[i]),
            y: indices.map(i => partido.votos[i]),
            mode: 'lines+markers',
            name: partido.nome,
            line: { width: 3 },
            marker: { size: 8 },
            hovertemplate: '%{y} votos (%{text}%)<extra></extra>',
            text: indices.map(i => partido.percentual[i].toFixed(2)),
          }));

          // Adicionar linha de total
          traces.push({
            x: indices.map(i => anos[i]),
            y: indices.map(i => data.total[i]),
            mode: 'lines+markers',
            name: 'Total',
            line: { color: '#000', width: 2, dash: 'dash' },
            marker: { size: 8 },
            hovertemplate: '%{y} votos (%{text}%)<extra></extra>',
            text: indices.map(i => data.percentualTotal[i].toFixed(2)),
          });

          const layout = {
            title: anoSelecionado === "todos"
              ? 'Crescimento da Votação por Partido (2014-2022)'
              : `Votação em ${anoSelecionado}`,
            xaxis: { title: 'Ano' },
            yaxis: { title: 'Número de Votos' },
            hovermode: 'closest',
            transition: { duration: 500 }, // Animação suave
            plot_bgcolor: '#f9f9f9', // Cor de fundo do gráfico
            paper_bgcolor: '#f9f9f9', // Cor de fundo da área externa
          };

          Plotly.react('grafico', traces, layout, { displayModeBar: false });
        }

        // Evento para atualizar o gráfico quando o usuário selecionar um ano
        document.getElementById('anoSelecionado').addEventListener('change', (event) => {
          criarGrafico(event.target.value);
        });

        // Criar o gráfico inicial com todos os anos
        criarGrafico("todos");
      })
      .catch(error => console.error('Erro ao carregar dados:', error));