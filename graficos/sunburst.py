import json

# Dados para o gr�fico Sunburst
data = {
    "labels": ["Total", "Categoria A", "Subcategoria A1", "Subcategoria A2", 
               "Categoria B", "Subcategoria B1", "Subcategoria B2"],
    "parents": ["", "Total", "Categoria A", "Categoria A", 
                "Total", "Categoria B", "Categoria B"],
    "values": [100, 60, 30, 30, 40, 20, 20],
    "customdata": [
        "Descri��o do Total",
        "Descri��o da Categoria A",
        "Descri��o da Subcategoria A1",
        "Descri��o da Subcategoria A2",
        "Descri��o da Categoria B",
        "Descri��o da Subcategoria B1",
        "Descri��o da Subcategoria B2"
    ]
}

# Salvar os dados em um arquivo JSON
with open("assets/sunburst_data.json", "w") as f:
    json.dump(data, f)