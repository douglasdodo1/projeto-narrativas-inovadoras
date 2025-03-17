export default function handler(req, res) {
  const data = {
    labels: ["Total", "PL", "Subcategoria A1", "Subcategoria A2", "Categoria B", "Subcategoria B1", "Subcategoria B2"],
    parents: ["", "Total", "Categoria A", "Categoria A", "Total", "Categoria B", "Categoria B"],
    values: [100, 60, 30, 30, 40, 20, 20],
    customdata: [
      "Descrição do Total",
      "Descrição da Categoria A",
      "Descrição da Subcategoria A1",
      "Descrição da Subcategoria A2",
      "Descrição da Categoria B",
      "Descrição da Subcategoria B1",
      "Descrição da Subcategoria B2"
    ]
  };

  res.status(200).json(data);
}
