// Import das funções
import getProdutos from "./getProdutos.js";
import getPedidos from "./getPedidos.js";
import getUsuarios from "./getUsuarios.js";
import adicionar_linha from "./functions/addLinha.js";
import trocarImagem from "./functions/trocarImagem.js";
import { iniciarLoading, pararLoading } from "./functions/loading.js";


// Função principal - requisição da API fake
async function exibirDados() {
    try {
        // Inicia a animação dos textos de "procurando..."
        iniciarLoading();

        // Busca as promises
        const dados = await Promise.allSettled([getUsuarios(), getProdutos(), getPedidos()]);
        // "Nomeia" os resultados
        let [usersRes, produtosRes, pedidosRes] = dados;

        // Verifica o status das promises
        dados.forEach((resultado, indice) => {
            // Se alguma promise falhar a imagem mudará para a de falha
            if (resultado.status === "rejected") {
                trocarImagem(gifs[indice], './public/imagens/falha.png')
            } else {
                // Do contrário a imagem muda para a de sucesso
                trocarImagem(gifs[indice], './public/imagens/encontrado.png')
            }
        })
        // Como os pedidos dependem dos usuários e dos produtos, caso um deles não seja encontrado
        // será exibido uma mensagem de atenção
        // dados[0] = usuarios
        // dados[1] = produtos
        // dados[2] = pedidos
        if (dados[0].status === "rejected" || dados[1].status === "rejected") {
            trocarImagem(gifs[2], './public/imagens/atencao.png')
        }
        // Guarda os resultados caso estejam resolvidas, do contrário ficam vazias
        const usuarios = usersRes.status === "fulfilled" ? usersRes.value : [];
        const produtos = produtosRes.status === "fulfilled" ? produtosRes.value : [];
        const pedidos = pedidosRes.status === "fulfilled" ? pedidosRes.value : [];

        // Adiciona as informações na tabela caso existam
        usuarios.forEach(usuario => {
            adicionar_linha('users', usuario)
        })

        // Adiciona as informações na tabela caso existam
        produtos.forEach(produto => {
            adicionar_linha('produtos', produto)
        });

        // Seleciona a mensagem dos pedidos
        let msg_procurandoPedidos = document.querySelector('#procurando_pedidos');
        // Se pedido não for vazio(foi encontrado)
        if (pedidos.length !== 0) {
            // Verifica se os usuários e produtos foram encontrados também
            if (usuarios.length !== 0 && produtos.length !== 0 && pedidos.length) {
                // Caso tudo esteja OK...
                pedidos.forEach(pedido => {
                    // Busca pelo usuário mencionado no pedido
                    let username = usuarios.find(user => user.id == pedido.usuarioId);
                    // Busca pelo produto mencionado no pedido
                    let produto = produtos.find(produto => produto.id == pedido.produtoId);

                    // Cria um novo objeto com os dados das outras tabelas
                    const pedidoFormatado = {
                        id: pedido.id,
                        usuario: username.nome,
                        produto: produto.nome,
                        quantidade: pedido.quantidade
                    }
                    // Adiciona na tabela
                    adicionar_linha('pedidos', pedidoFormatado)
                    // Altera o texto de "procurando..."
                    msg_procurandoPedidos.textContent = "Pedidos encontrados!"
                })
            } else {
                // Caso os produtos ou usuários não tenham sido usuários
                msg_procurandoPedidos.textContent = "Usuários / Produtos não encontrados..."
            }
        } else {
            // Troca a imagem dos pedidos para a de falha caso a promise em si tenha sido rejeitada
            trocarImagem(gifs[2], './public/imagens/falha.png');
            // Avisa que a promise falhou
            msg_procurandoPedidos.textContent = "Pedidos não encontrados!"
        }
        // Finaliza as animações de loading
        pararLoading(dados);
    } finally {
        // Seleciona o modal
        let container_modal = document.querySelector('.container-modal');

        // Declara um timeout de 7 segundos para a visualização do resultado da busca
        setTimeout(() => {
            // Esconde o modal
            container_modal.style.display = "none";
            // Reseta os gifs
            gifs.forEach(gif => {
                trocarImagem(gif, './public/imagens/carregando.gif');
            })

            let tituloModal = document.querySelector(".titulo_modal");
            tituloModal.textContent = "------ Requisitando informações ------"
        }, 7000)



    }
}

// Seleção do botão de carregamento
let btn = document.querySelector('.btn_carregar');
// Seleciona o modal
let container_modal = document.querySelector('.container-modal');

// Seleciona os gifs / imagens do modal
const gifs = document.querySelectorAll('.gif');

// Event listener de clique,
btn.addEventListener('click', () => {
    // Ao clicar no botão o modal será exibido
    container_modal.style.display = "flex";
    // Chama a função principal
    exibirDados();
})