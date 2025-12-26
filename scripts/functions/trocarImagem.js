function trocarImagem(gif, novaSrc) {
    // Adiciona a classe fade-out para o desaparecimento gradual do gif
    gif.classList.add("fade-out");

    // Coloca um timeout de 0.4s entre a troca
    setTimeout(() => {
        // Troca o caminho da imagem
        gif.src = novaSrc;
        gif.classList.remove("fade-out");
        gif.classList.add("fade-in");
    }, 400);
}

export default trocarImagem;