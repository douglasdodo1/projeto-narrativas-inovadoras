// Simula uma API que retorna uma lista de deputados
export default function handler(req, res) {
    const deputados = [
      {
        nome: "Joel da Harpa",
        partido: "PL",
        descricao: "Filho de Jaboatão dos Guararapes, de direita e base conservadora, cristão, o policial militar",
        foto: "/images/joel_da_harpa.jpg",
        votos: 35938,
        seguidores: 37900,
        candidatura: "2022-Hoje"
      },
      {
        nome: "Renato Antunes",
        partido: "PL",
        descricao: "Evangélico, o seu mandato será pautado pelo diálogo, respeito e pela intenção de englobar toda população.",
        foto: "/images/renato_antunes.jpg",
        votos: 46226,
        seguidores: 38800,
        candidatura: "2022-Hoje"
      },
      {
        nome: "Abimael Santos",
        partido: "PL",
        descricao: "Apoiador do ex-presidente Jair Bolsonaro, o parlamentar teve como slogan de sua campanha ao Legislativo estadual “Te Liberta Pernambuco!”, e se apresenta nas redes sociais como cristão, patriota, defensor da família e dos bons costumes. ",
        foto: "/images/abimael_santos.jpg",
        votos: 43530,
        seguidores: 78200,
        candidatura: "2022-Hoje"
      },
      {
        nome: "Coronel Alberto Feitosa",
        partido: "PL",
        descricao: "Foi  eleito líder da Bancada do Partido Liberal (PL) por unanimidade.",
        foto: "/images/coronel_alberto_feitosa.jpg",
        votos: 146847,
        seguidores: 97400,
        candidatura: "2022-Hoje"
      },
      {
        nome: "Nino de Enoque",
        partido: "PL",
        descricao: "Nascido e criado na zona rural, conviveu com pessoas humildes e trabalhadores da cana-de-açúcar, aprendendo com elas a levar uma vida de simplicidade, característica que mantém até os dias atuais.",
        foto: "/images/nino_de_enoque.jpg",
        votos: 24851,
        seguidores: 17000,
        candidatura: "2022-Hoje"
      }
      ,
      {
        nome: "Adalto Santos",
        partido: "PP",
        descricao: "Como deputado estadual, sua principal bandeira de trabalho é a defesa da família e dos valores cristãos",
        foto: "/images/adalto_santos.jpg",
        votos: 51371,
        seguidores: 8000,
        candidatura: "2022-Hoje"
      }
    
    
    ]
    ;
  
    res.status(200).json(deputados);
  }
  