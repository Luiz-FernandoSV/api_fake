let contador = 0;
let intervalo;

// Seleciona as mensagens de procurando
let msg_procurandoUsers = document.querySelector('#procurando_users');
let msg_procurandoProdutos = document.querySelector('#procurando_produtos');
let msg_procurandoPedidos = document.querySelector('#procurando_pedidos');

export function iniciarLoading() {
    // contador de pontinhos
    contador = 0;

    // variavel para guardar o intervalo atual
    intervalo = setInterval(() => {
        contador = (contador + 1) % 4;
        msg_procurandoUsers.textContent = "Procurando usuários" + ".".repeat(contador)
        msg_procurandoProdutos.textContent = "Procurando produtos" + ".".repeat(contador)
        msg_procurandoPedidos.textContent = "Procurando pedidos" + ".".repeat(contador)
    }, 500);
}

export function pararLoading(statusPromises) {
    // Reinicia o intervalo
    clearInterval(intervalo);

    // Verifica o status das promises
    statusPromises[0].status === 'fulfilled' ? msg_procurandoUsers.textContent = "Usuários Encontrados!" : msg_procurandoUsers.textContent = "Usuários não encontrados!";
    statusPromises[1].status === 'fulfilled' ? msg_procurandoProdutos.textContent = "Produtos Encontrados!" : msg_procurandoProdutos.textContent = "Produtos não encontrados!";

    let tituloModal = document.querySelector(".titulo_modal");
    tituloModal.textContent = "---------- Resultado da busca ----------"

}