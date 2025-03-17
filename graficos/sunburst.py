import json
import os

# Dados para o gráfico Sunburst
data = {
    "labels": ["Total", "Categoria A", "Subcategoria A1", "Subcategoria A2",
               "Categoria B", "Subcategoria B1", "Subcategoria B2"],
    "parents": ["", "Total", "Categoria A", "Categoria A",
                "Total", "Categoria B", "Categoria B"],
    "values": [100, 60, 30, 30, 40, 20, 20],
    "customdata": [
        "Descrição do Total",
        "Descrição da Categoria A",
        "Descrição da Subcategoria A1",
        "Descrição da Subcategoria A2",
        "Descrição da Categoria B",
        "Descrição da Subcategoria B1",
        "Descrição da Subcategoria B2"
    ]
}

# Cria a pasta assets se ela não existir
os.makedirs("assets", exist_ok=True)

# Salva os dados em um arquivo JSON na pasta assets
try:
    with open("assets/sunburst_data.json", "w") as f:
        json.dump(data, f)
    print("Arquivo 'sunburst_data.json' criado com sucesso!")
except Exception as e:
    print(f"Erro ao criar o arquivo JSON: {e}")