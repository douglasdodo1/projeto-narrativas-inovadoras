// Carregar dados do arquivo JSON
fetch('assets/sunburst_data.json')
    .then(response => response.json())
    .then(data => {
        // Criar o gráfico Sunburst
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
            title: 'Gráfico Sunburst Interativo',
            margin: { l: 0, r: 0, b: 0, t: 30 },
            height: 600
        };

        Plotly.newPlot('sunburst-graph', [trace], layout);
    })
    .catch(error => console.error('Erro ao carregar dados:', error));