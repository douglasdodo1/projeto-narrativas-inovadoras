export default function handler(req, res) {
  //dados dos partidos
  const partidos = [
    { nome: "PL", deputados: 2, descricao: "Deputados Joel da Harpa, Renato Antunes" },
    { nome: "Republicanos", deputados: 1, descricao: "Deputado William Brígido" },
    { nome: "PP", deputados: 3, descricao: "Deputados Pastor Cleiton Collins, Pastor Júnior Tércio, Adalto Santos" },
    { nome: "União Brasil", deputados: 1, descricao: "Deputado Romero Sales Filho" }
  ];

  const labels = ["Total", ...partidos.map(p => p.nome)];
  const parents = ["", ...Array(partidos.length).fill("Total")];
  const values = [partidos.reduce((acc, p) => acc + p.deputados, 0), ...partidos.map(p => p.deputados)];
  const customdata = ["Total de deputados", ...partidos.map(p => p.descricao)];
  
  res.status(200).json({ labels, parents, values, customdata });
}
