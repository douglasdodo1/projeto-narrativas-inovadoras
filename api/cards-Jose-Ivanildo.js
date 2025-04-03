export default function handler(req, res) {
  const deputado_jose_ivanildo = [
    {
      nome: "José Ivanildo de Moura Júnior",
      partido: "PP",
      descricao:
        "Casado com a deputada federal Clarissa Tércio e pai de Clara e Alice, José Ivanildo de Moura Júnior, conhecido como Pastor Júnior Tércio, foi eleito o deputado estadual mais votado de Pernambuco, nas eleições de 2022, com 183.735 votos. ",
      foto: "/images/jose_ivanildo.jpg",
      votos: 183.735,
      candidatura: "2022-Hoje",
    },
  ];
  res.status(200).json(deputado_jose_ivanildo);
}
