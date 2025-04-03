export default function handler(req, res) {
  const deputado_joel_da_harpa = [
    {
      nome: "Joel da Harpa",
      partido: "PL",
      descricao:
        "Filho de Jaboatão dos Guararapes, de direita e base conservadora, cristão, o policial militar, o deputado Joel da Harpa, tem como destaque, em sua atuação na Alepe, a luta por melhores condições de vida para os profissionais da segurança pública, bem como o compromisso de representar os valores morais da família na Bancada Evangélica e das pessoas com algum tipo de limitação. ",
      foto: "/images/joel_da_harpa.jpg",
      votos: 35938,
      candidatura: "2016-Hoje",
    },
  ];
  res.status(200).json(deputado_joel_da_harpa);
}
