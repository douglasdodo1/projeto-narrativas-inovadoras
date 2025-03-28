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

              const descricao = document.createElement('p');
              descricao.textContent = `Descrição: ${deputado.descricao}`;

              const votos = document.createElement('p');
              votos.textContent = `Votos: ${deputado.votos}`;

              const seguidores = document.createElement('p');
              seguidores.textContent = `Seguidores: ${deputado.seguidores}`;

              const candidatura = document.createElement('p');
              candidatura.textContent = `Candidatura: ${deputado.candidatura}`;


              cardBack.appendChild(descricao);
              cardBack.appendChild(votos);
              cardBack.appendChild(seguidores);
              cardBack.appendChild(candidatura);

              // Adiciona o conteúdo da frente e do verso ao card
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
        ? anos.map((_, index) => index) 
        : [anos.indexOf(anoSelecionado)]; 

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

      const eventosHistoricos = [
        { ano: 2014, descricao: '(Início da Operação Lava Jato)', cor: 'blue' },
        { ano: 2018, descricao: '(Bolsonaro se lança à presidência)', cor: 'blue' }
      ];

      eventosHistoricos.forEach(evento => {
        traces.push({
          x: [evento.ano, evento.ano], 
          y: [0, Math.max(...data.total)], 
          mode: 'lines',
          name: evento.descricao,
          line: { color: evento.cor, width: 2, dash: 'dot' },
          hoverinfo: 'none', 
          hovertemplate: `<b>${evento.descricao}</b><extra></extra>`,
          showlegend: false 
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
          bgcolor: 'white', 
          bordercolor: 'black', 
          font: { size: 12 }, 
          align: 'left', 
          namelength: -1 
        },
        transition: { duration: 500 },
        plot_bgcolor: '#f9f9f9',
        paper_bgcolor: '#f9f9f9',
        margin: { t: 60, b: 60, l: 60, r: 60 } 
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
  const height = 400;

  function colide(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  function posicionarPalavra(el, elementosExistentes) {
    let tentativas = 0;
    const maxTentativas = 100;

    while (tentativas < maxTentativas) {
      const elWidth = el.offsetWidth;
      const elHeight = el.offsetHeight;
      const x = Math.random() * (width - elWidth);
      const y = Math.random() * (height - elHeight);

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      let colidiu = false;
      for (const outroEl of elementosExistentes) {
        if (colide(el, outroEl)) {
          colidiu = true;
          break;
        }
      }

      if (!colidiu) {
        return;
      }

      tentativas++;
    }

    console.warn('Não foi possível encontrar uma posição válida para a palavra:', el.textContent);
  }

  fetch('/api/nuvem-palavras')
    .then(response => response.json())
    .then(data => {
      const elementosExistentes = [];

      data.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        link.textContent = item.palavra;
        link.style.fontSize = `${item.tamanho}%`;
        link.style.position = 'absolute';
        link.style.textDecoration = 'none';
        link.style.color = 'black';
        link.style.fontWeight = 'bold';
        link.style.cursor = 'pointer';

        container.appendChild(link);
        elementosExistentes.push(link);

        setTimeout(() => {
          posicionarPalavra(link, elementosExistentes);
          link.style.animation = `flutuar ${Math.random() * 5 + 3}s infinite ease-in-out alternate`;
        }, 0);
      });
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
});

//--------------------------Reduto Eleitoral (Troca de Imagens)--------------------------

document.addEventListener("DOMContentLoaded", function() {
  const selector = document.getElementById("iframeSelector");
  const iframes = document.querySelectorAll("#iframeContainer iframe");

  selector.addEventListener("change", function() {
      // Oculta todos os iframes
      iframes.forEach(iframe => iframe.style.display = "none");

      // Obtém o valor selecionado
      const selectedId = selector.value;
      if (selectedId) {
          // Exibe o iframe correspondente
          document.getElementById(selectedId).style.display = "block";
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
//-------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('graphCarousel');
    const prevButton = document.getElementById('prevGraph');
    const nextButton = document.getElementById('nextGraph');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Função para atualizar o carrossel
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    // Avançar para o próximo gráfico
    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao primeiro gráfico
        }
        updateCarousel();
    });

    // Voltar para o gráfico anterior
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1; // Vai para o último gráfico
        }
        updateCarousel();
    });

    // Inicializa o carrossel
    updateCarousel();
});