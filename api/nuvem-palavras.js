// Função serverless para servir os dados da nuvem de palavras
export default async function handler(req, res) {
    const data = [
        { palavra: "Saúde", tamanho: 80 },
        { palavra: "Educação", tamanho: 60 },
        { palavra: "Infraestrutura", tamanho: 40 },
        { palavra: "Meio Ambiente", tamanho: 30 },
        { palavra: "Tecnologia", tamanho: 20 },
        { palavra: "Segurança", tamanho: 50 },
        { palavra: "Cultura", tamanho: 25 }
    ];

    // Responde com os dados JSON
    res.status(200).json(data);
}