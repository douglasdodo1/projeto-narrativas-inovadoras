//--------------------------Sunburst Chart--------------------------
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
      textinfo: 'label+value',//Exibe nome e número de deputados
      insidetextorientation: 'radial'
    };

    const layout = {
      title: 'Composição da Bancada Evangélica da ALEPE',
      margin: { l: 0, r: 0, b: 0, t: 50 },
      height: 250
    };

    Plotly.newPlot('sunburst-graph', [trace], layout, { displayModeBar: false });
  })
  .catch(error => console.error('Erro ao carregar dados:', error));

//--------------------------Flip Cards (Deputados)--------------------------
window.onload = function() {
  fetch('/api/cards')
      .then(response => response.json())
      .then(deputados => {
          const cardsContainer = document.getElementById('cards-container');

          deputados.forEach(deputado => {
              const card = document.createElement('div');
              card.classList.add('card');
              card.setAttribute('onclick', 'flipCard(this)');

              const cardInner = document.createElement('div');
              cardInner.classList.add('card-inner');

              //Frente do card (imagem e informações básicas)
              const cardFront = document.createElement('div');
              cardFront.classList.add('card-front');
              cardFront.innerHTML = `
                  <img src="${deputado.foto}" alt="Foto de ${deputado.nome}">
                  <h3>${deputado.nome}</h3>
                  <p>${deputado.partido}</p>
              `;

              //Verso do card (descrição, citação e projetos)
              const cardBack = document.createElement('div');
              cardBack.classList.add('card-back');
              cardBack.innerHTML = `
                  <p>Descrição: ${deputado.descricao}</p>
                  <p>Citação: ${deputado.citacao}</p>
                  <p>Projetos: ${deputado.projetos.join(', ')}</p>
              `;

              cardInner.appendChild(cardFront);
              cardInner.appendChild(cardBack);
              card.appendChild(cardInner);
              cardsContainer.appendChild(card);
          });
      })
      .catch(error => console.error('Erro ao carregar dados dos deputados:', error));
};

//Alterna o efeito de flip no card ao ser clicado
function flipCard(card) {
    card.classList.toggle('flipped');
}

//--------------------------Gráfico de Votos por Partido--------------------------

fetch('/api/votos')
  .then(response => response.json())
  .then(data => {
    const anos = data.anos;
    const partidos = data.partidos;

    function criarGrafico(anoSelecionado) {
      let indices = anoSelecionado === "todos"
        ? anos.map((_, index) => index) // Todos os anos
        : [anos.indexOf(anoSelecionado)]; // Apenas o ano selecionado

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

      // Linha total de votos
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

      // Traces invisíveis para eventos históricos (hover)
      const eventosHistoricos = [
        { ano: 2014, descricao: '(Início da Operação Lava Jato)', cor: 'blue' },
        { ano: 2018, descricao: '(Bolsonaro se lança à presidência)', cor: 'blue' }
      ];

      eventosHistoricos.forEach(evento => {
        traces.push({
          x: [evento.ano, evento.ano], // Linha vertical
          y: [0, Math.max(...data.total)], // Altura máxima do gráfico
          mode: 'lines',
          name: evento.descricao,
          line: { color: evento.cor, width: 2, dash: 'dot' },
          hoverinfo: 'none', // Desativa o hover padrão
          hovertemplate: `<b>${evento.descricao}</b><extra></extra>`, // Texto completo no hover
          showlegend: false // Não mostrar na legenda
        });
      });

      const layout = {
        title: anoSelecionado === "todos"
          ? 'Crescimento da Votação por Partido (2014-2022)'
          : `Votação em ${anoSelecionado}`,
        xaxis: { title: 'Ano' },
        yaxis: { title: 'Número de Votos' },
        hovermode: 'closest',
        hoverlabel: {
          bgcolor: 'white', // Fundo branco para melhor contraste
          bordercolor: 'black', // Borda preta para delimitar
          font: { size: 12 }, // Tamanho da fonte
          align: 'left', // Alinhamento do texto
          namelength: -1 // Evita truncamento do texto
        },
        transition: { duration: 500 },
        plot_bgcolor: '#f9f9f9',
        paper_bgcolor: '#f9f9f9',
        margin: { t: 60, b: 60, l: 60, r: 60 } // Margens maiores para evitar cortes
      };

      Plotly.react('grafico', traces, layout, { displayModeBar: false });
    }

    document.getElementById('anoSelecionado').addEventListener('change', (event) => {
      criarGrafico(event.target.value);
    });

    criarGrafico("todos");
  })
  .catch(error => console.error('Erro ao carregar dados:', error));

//--------------------------Nuvem de Palavras--------------------------
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('palavras-container');
  const width = container.offsetWidth;
  const height = 400;//Altura fixa

  function posicionarPalavra(span) {
    const spanWidth = span.offsetWidth;
    const spanHeight = span.offsetHeight;
    const x = Math.random() * (width - spanWidth);
    const y = Math.random() * (height - spanHeight);

    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
  }

  fetch('/api/nuvem-palavras')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item.palavra;
        span.style.fontSize = `${item.tamanho}%`;
        container.appendChild(span);

        setTimeout(() => {
          posicionarPalavra(span);
          span.style.animation = `flutuar ${Math.random() * 5 + 3}s infinite ease-in-out alternate`;
        }, 0);
      });
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
});

//--------------------------Reduto Eleitoral (Troca de Imagens)--------------------------
document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("imageSelector");
  const image = document.getElementById("displayedImage");

  selector.addEventListener("change", function () {
    const selectedValue = selector.value;
    if (selectedValue) {
      image.style.opacity = "0";
      setTimeout(() => {
        image.src = `images/${selectedValue}`;
        image.style.display = "block";
        image.style.opacity = "1";
      }, 300);
    } else {
      image.style.opacity = "0";
      setTimeout(() => {
        image.style.display = "none";
      }, 300);
    }
  });
});

//--------------------------Efeito de Queda dos Anjos Caídos--------------------------
document.addEventListener('scroll', () => {
  const fallMans = document.querySelectorAll('.fallMan');
  const scrollPosition = window.scrollY;
  const maxScroll = 3500; // Ponto onde as imagens desaparecem

  fallMans.forEach((fallMan, index) => {
    let newTop = scrollPosition * 0.2; // Movimento vertical
    let opacity = 1 - (scrollPosition / maxScroll); // Opacidade diminui com o scroll

    opacity = Math.max(0, Math.min(1, opacity));

    // Calcula o movimento lateral suave usando Math.sin
    let lateralMovement = Math.sin(scrollPosition * 0.02 + index) * 10; // Oscilação suave

    // Aplica apenas o movimento lateral e vertical, preservando as transformações iniciais
    fallMan.style.transform = `translate(${lateralMovement}px, ${newTop}px)`;

    fallMan.style.opacity = opacity;
  });
});
