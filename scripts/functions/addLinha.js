function adicionar_linha(tipo,lista){
    // Seleciona a tabela alvo de acordo com o tipo (usuarios, produtos, pedidos)
    let tabela = document.querySelector('.tabela_'+tipo);

    // Verifica quantos atributos o objeto tem
    let qtdDados = Object.keys(lista).length;

    // Cria uma nova linha
    let novaLinha = document.createElement('tr');

    // Obtém os nomes dos atributos
    let atributos = Object.keys(lista)

    // Loop que itera sobre a quantidade de atributos
    for(let i = 0; i < qtdDados; i++){
        // Cria uma célula na tabela
        let casa = document.createElement('td');
        // Atribui o conteúdo para o valor daquela chave naquele indice
        casa.textContent = lista[atributos[i]]
        // Coloca a celula na linha
        novaLinha.appendChild(casa);
    }
    
    // Adiciona a linha na tabel
    tabela.appendChild(novaLinha)
}

export default adicionar_linha;