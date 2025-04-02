
export default function handler(req, res) {
    const deputado_cleiton_collins = [
      {
        nome: "Cleiton Collins",
        partido: "PP",
        descricao: "Tem atuação legislativa voltada para diversas áreas, com destaque para o combate às drogas, em defesa da Bíblia, da família, da vida, contra o aborto e em defesa de projetos com ênfase na melhoria da saúde da população, atenção às pessoas com deficiência e em situação de marginalização social.",
        foto: "/images/cleiton_collins.jpg",
        votos: 50510,
        candidatura: "2003-Hoje"
      }    
    ]
    ;
  
    res.status(200).json(deputado_cleiton_collins);
  }
  