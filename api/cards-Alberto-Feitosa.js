export default function handler(req, res) {
  const deputado_alberto_feitosa = [
    {
      nome: "Coronel Alberto Feitosa",
      partido: "PL",
      descricao:
        "O Coronel Alberto Feitosa assumiu, em 2023, seu quinto mandato como parlamentar na Alepe, sendo eleito o segundo deputado estadual mais bem votado de Pernambuco, com 146.847 votos em todos os 184 municípios, mais o distrito de Fernando de Noronha. Foi  eleito líder da Bancada do Partido Liberal (PL) por unanimidade",
      foto: "/images/coronel_alberto_feitosa.jpg",
      votos: 146.847,
      candidatura: "2018-hoje",
    },
  ];
  res.status(200).json(deputado_alberto_feitosa);
}
