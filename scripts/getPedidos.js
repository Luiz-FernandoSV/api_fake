/* 
Função de busca da API fake - Endpoint de pedidos

buscarPedidos() -> cria a promise e retorna
getPedidos() -> aguarda os resultados do fetch, converte para JSON e retorna

*/

function buscarPedidos() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch('/public//dados/pedidos.json')
                .then(resolve)
                .catch(()=>{
                    reject("erro ao buscar os produtos")
                })
            }, 4000);
        })
}

async function getPedidos() {
    const resultado = await buscarPedidos();
    return await resultado.json();
}

export default getPedidos;