fetch('/api/sunburst')
  .then(response => response.json())
  .then(data => {
    //GRÁFICO SUNBURST para composição política
    const trace = {
      type: 'sunburst',
      labels: data.labels,
      parents: data.parents,
      values: data.values,
      customdata: data.customdata,
      hovertemplate: '<b>%{label}</b><br>%{customdata}<extra></extra>',
      branchvalues: 'total'
    };

    const layout = {
      title: 'Composição da Bancada Evangélica da ALEPE',
      margin: { l: 0, r: 0, b: 0, t: 30 },
      height: 600
    };

    Plotly.newPlot('sunburst-graph', [trace], layout);
    //GRÁFICO SUNBURST para composição política
  })
  .catch(error => console.error('Erro ao carregar dados:', error));
