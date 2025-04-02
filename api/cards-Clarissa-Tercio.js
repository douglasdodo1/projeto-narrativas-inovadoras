
export default function handler(req, res) {
    const deputado_clarissa_tercio = [
      {
        nome: "Clarissa Tércio",
        partido: "PP",
        descricao: "Elaborar Projetos de Lei, defender a vida (desde a concepção), defender os valores da família, combater a ideologia de gênero, lutar por melhores condições de tratamento para portadores de doenças raras, cobrar do Governo mais atenção e inclusão com pessoas com deficiência nas áreas da saúde, educação, transporte e moradia, além de ampliar o trabalho desenvolvido junto ao Centro de Recuperação de Dependentes Químicos – (Novas de Paz).",
        foto: "/images/clarissa_tercio.jpg",
        votos: 50.789,
        candidatura: "2019-2022"
      }    
    ]
    ;
  
    res.status(200).json(deputado_clarissa_tercio);
  }
  