// Função serverless para servir os dados da nuvem de palavras
export default async function handler(req, res) {
    const data = [
        { palavra: <a href="https://www.alepe.pe.gov.br/proposicao-texto-completo/?docid=8516&tipoprop=p">Preconceito contra Antivax</a>, tamanho: 100 },
        { palavra: <a href="https://www.alepe.pe.gov.br/proposicao-texto-completo/?docid=8330&tipoprop=p">Cristofobia</a>, tamanho: 100 },
        { palavra: <a href="https://www.alepe.pe.gov.br/proposicao-texto-completo/?docid=13095&tipoprop=p">O que é mulher?</a>, tamanho: 340 },
        { palavra: <a href="https://www.alepe.pe.gov.br/proposicao-texto-completo/?docid=10045&tipoprop=p">Proibição de transição de gênero em menores de 18 mesmo com consentimento dos pai</a>, tamanho: 108 },

    // Responde com os dados JSON
    res.status(200).json(data);
}