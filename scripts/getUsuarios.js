/* 
Função de busca da API fake - Endpoint de usuários

buscarUsuarios() -> cria a promise e retorna
getUsuarios() -> aguarda os resultados do fetch, converte para JSON e retorna

*/

function buscarUsuarios() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch('/public/dados/usuarios.json')
                .then(resolve)
                .catch(() => {
                    reject("erro ao buscar os usuários")
                })
                
            }, 4000);
        })
}

async function getUsuarios() {
    const resultado = await buscarUsuarios()
    return await resultado.json()
}

export default getUsuarios;