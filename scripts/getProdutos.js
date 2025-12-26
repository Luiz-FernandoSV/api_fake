/* 
Função de busca da API fake - Endpoint de produtos

buscarProdutos() -> cria a promise e retorna
getProdutos() -> aguarda os resultados do fetch, converte para JSON e retorna

*/

function buscarProdutos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('/public//dados/produtos.json')
            .then(resolve)
            .catch(()=>{
                reject("erro ao buscar os produtos")
            })
        }, 4000);
    })
}

async function getProdutos() {
    const resultado = await buscarProdutos();
    return await resultado.json();
}

export default getProdutos;