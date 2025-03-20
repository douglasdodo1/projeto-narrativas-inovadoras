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

        // Definir cores fixas para cada partido (melhor consistência visual)
        const coresPartidos = {
          "PP": "#00ff99", // Verde neon
          "União (DEM/PSL)": "#ff0066", // Rosa neon
          "PL": "#00bfff", // Azul claro
          "Republicanos": "#ff6347", // Vermelho tomate
          "Total": "#ffffff", // Branco para o total
        };

        // Função para criar o gráfico com base no ano selecionado
        function criarGrafico(anoSelecionado) {
          let indices = [];
          if (anoSelecionado === "todos") {
            indices = anos.map((_, index) => index); // Todos os anos
          } else {
            indices = [anos.indexOf(anoSelecionado)]; // Índice do ano selecionado
          }

          // Preparar os dados iniciais (colunas zeradas)
          const traces = partidos.map(partido => ({
            x: indices.map(i => anos[i]),
            y: indices.map(() => 0), // Valores iniciais zerados
            type: 'bar',
            name: partido.nome,
            hovertemplate: '%{y} votos (%{text}%)<extra></extra>',
            text: indices.map(i => partido.percentual[i].toFixed(2)),
            marker: { color: coresPartidos[partido.nome] }, // Cor fixa para cada partido
          }));

          // Adicionar barra de total
          traces.push({
            x: indices.map(i => anos[i]),
            y: indices.map(() => 0), // Valores iniciais zerados
            type: 'bar',
            name: 'Total',
            hovertemplate: '%{y} votos (%{text}%)<extra></extra>',
            text: indices.map(i => data.percentualTotal[i].toFixed(2)),
            marker: { color: coresPartidos["Total"] }, // Cor fixa para o total
          });

          const layout = {
            title: anoSelecionado === "todos"
              ? 'Distribuição de Votos por Partido (2014-2022)'
              : `Votação em ${anoSelecionado}`,
            barmode: 'stack', // Barras empilhadas
            xaxis: { title: 'Ano', tickfont: { color: '#ffffff' } },
            yaxis: { title: 'Número de Votos', tickfont: { color: '#ffffff' } },
            plot_bgcolor: '#1e1e1e', // Fundo do gráfico
            paper_bgcolor: '#1e1e1e', // Fundo externo
            font: { color: '#ffffff' }, // Cor do texto
            transition: { duration: 500 }, // Animação suave
          };

          // Criar o gráfico inicial com valores zerados
          Plotly.newPlot('grafico', traces, layout, { displayModeBar: false });

          // Animar o crescimento das colunas
          setTimeout(() => {
            const novosDados = partidos.map(partido => ({
              y: indices.map(i => partido.votos[i]), // Valores reais
            }));

            // Adicionar os dados do total
            novosDados.push({
              y: indices.map(i => data.total[i]), // Valores reais do total
            });

            // Animar o gráfico
            Plotly.animate(
              'grafico',
              { data: novosDados },
              { transition: { duration: 1000 }, frame: { duration: 1000 } }
            );
          }, 500); // Delay para garantir que o gráfico inicial seja renderizado
        }

        // Evento para atualizar o gráfico quando o usuário selecionar um ano
        document.getElementById('anoSelecionado').addEventListener('change', (event) => {
          criarGrafico(event.target.value);
        });

        // Criar o gráfico inicial com todos os anos
        criarGrafico("todos");
      })
      .catch(error => console.error('Erro ao carregar dados:', error));