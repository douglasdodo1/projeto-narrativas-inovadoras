// Simula uma API que retorna uma lista de deputados
export default function handler(req, res) {
    const deputados = [
      {
        nome: "Joel da Harpa",
        partido: "PL",
        descricao: "Descrição ALEPE",
        citacao: "Citação do deputado Joel da Harpa.",
        foto: "/images/joel_da_harpa.jpg",
        projetos: ["PL 1 - Segurança Pública", "PL 2 - Apoio à PM"]
      },
      {
        nome: "Renato Antunes",
        partido: "PL",
        descricao: "Descrição ALEPE",
        citacao: "Citação do deputado Renato Antunes.",
        foto: "/images/renato_antunes.jpg",
        projetos: ["PL 3 - Educação", "PL 4 - Transporte"]
      }
    ];
  
    res.status(200).json(deputados);
  }
  