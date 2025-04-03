export default function handler(req, res) {
  const deputado_abimael_santos = [
    {
      nome: "Abimael dos Santos Pereira",
      partido: "PL",
      descricao:
        "Natural de Toritama, no Agreste Setentrional, Abimael Santos exerceu por muitos anos a profissão de eletricista. No Legislativo estadual, onde cumpre o primeiro mandato, ele  planeja atuar em favor da capital do jeans de Pernambuco e de todos os municípios do Polo de Confecções. A crise hídrica que afeta desde sempre a região também preocupa o deputado estreante. Ele pretende cobrar do Governo ações para regularizar o abastecimento d´água no Agreste. ",
      foto: "/images/abimael_santos.jpg",
      votos: 43.53,
      candidatura: "2022-hoje",
    },
  ];
  res.status(200).json(deputado_abimael_santos);
}
