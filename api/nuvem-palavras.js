// Função serverless para servir os dados da nuvem de palavras
export default async function handler(req, res) {
    const data = [
        { palavra: "Saúde", tamanho: 100 },
        { palavra: "Educação", tamanho: 100 },
        { palavra: "Infraestrutura", tamanho: 340 },
        { palavra: "Meio Ambiente", tamanho: 108 },
        { palavra: "Tecnologia", tamanho: 209 },
        { palavra: "Segurança", tamanho: 502 },
        { palavra: "Cultura", tamanho: 100 }
    ];

    // Responde com os dados JSON
    res.status(200).json(data);
}