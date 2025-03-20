// api/votos.js
export default function handler(req, res) {
  const dados = {
    anos: ["2014", "2018", "2022"],
    partidos: [
      {
        nome: "PP",
        votos: [371060, 792517, 720105],
        percentual: [8.06, 17.57, 14.36],
      },
      {
        nome: "União (DEM/PSL)",
        votos: [69199, 178253 + 89682, 460153],
        percentual: [1.50, 3.95 + 1.99, 9.18],
      },
      {
        nome: "PL",
        votos: [0, 0, 422456],
        percentual: [0, 0, 8.43],
      },
      {
        nome: "Republicanos",
        votos: [0, 0, 235974],
        percentual: [0, 0, 4.71],
      },
    ],
    total: [440259, 1060452, 1838688],
    percentualTotal: [9.59, 23.51, 36.68],
  };

  res.status(200).json(dados);
}