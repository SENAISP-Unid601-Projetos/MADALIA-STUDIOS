var canvas = document.getElementById("meuCanvas"); // Pegando o canvas no HTML
var context = canvas.getContext("2d"); // Pegando o contexto em 2d

// Botão para novo jogo quando perder
var botaoNovoJogo = document.getElementById("btnNovoJogo"); // Pega o btn no HTML
botaoNovoJogo.addEventListener("click", function(){
    reiniciarJogo(); // Chama a função que reinicia o jogo
});

// Div dos botões finais do jogo
var divBotoesFinais = document.getElementById("botoesFinais"); // Pegando no HTML

// Imagem da logo do jogo
var imgLogoJogo = document.getElementById("imgLogoJogo"); // Pegando no HTML

// Texto Final
var textoFinal = document.getElementById("textoFinal"); // Pegando no HTML

// Pegando o botão que muta os sons
var botaoMutar = document.getElementById("btnMutar");

// Btn de avançar
var btnAvancar = document.getElementById("btnAvancar"); // Pegando no HTML

// Evento de escuta de clique
btnAvancar.addEventListener("click", function(){
    imgLogoJogo.style.display = "none"; // Esconde a imagem do jogo
    btnAvancar.style.display = "none"; // Esconde o botão de avançar

    divBotoesFinais.style.display = "block"; // Exibe os botões finais do jogo

    textoFinal.style.display = "none"; // Esconde o texto Final
});

// Flag que mutará as músicas
var permissaoParaMutarMusicas = true;

// Flag que permitirá ou não o jogo inteiro funcionar
var permissaoParaRodarJogo = false;

// Função que mutará o jogo
botaoMutar.addEventListener("click", function(){
    permissaoParaMutarMusicas = !permissaoParaMutarMusicas; // Troca o valor da flag

    // Muda o texto do botão
    if(permissaoParaMutarMusicas){
        botaoMutar.value = "Mutar"; // Muda o que está escrito no botão

        // Muda a cor do botão
        botaoMutar.style.backgroundColor = "#613DC1";

        // Só toca a música caso o jogo não esteja pausado
        if(!jogoPausado){
            trilhaSonoraFases.play(); // Toca a música
        }
    }else{
        botaoMutar.value = "Desmutar";  // Muda o que está escrito no botão

        // Muda a cor do botão
        botaoMutar.style.backgroundColor = "#c1121f";

        trilhaSonoraFases.pause(); // Para a música
    }

    botaoMutar.blur(); // Remove o foco no botão após ser clicado
});

// Vídeo de cutscene antes de iniciar o jogo
var videoInicial = document.getElementById("videoInicio"); // Pegando o vídeo no HTML

// Vídeo de transição da fase 1 para a 2
var video = document.getElementById("meuVideo"); // Pegando o vídeo no HTML

// Vídeo de transição da fase 2 para a 3
var videoFase2_3 = document.getElementById("meuVideo2"); // Pegando o vídeo no HTML

// Vídeo da cutscene final 
var videoFinal = document.getElementById("videoFinal"); // Pegando o vídeo no HTML

// Seleciona o botão de pular
var pularCutesceneInicio = document.getElementById("skipInicio"); // Pegando o botão no HTML

// Seleciona o botão de pular
var pularVideo1_2 = document.getElementById("skipButton"); // Pegando o botãoo no HTML

// Seleciona o botão de pular
var pularVideo2_3 = document.getElementById("skipButton2"); // Pegando o botão no HTML

// Trilha sonora das fases
var trilhaSonoraFases = new Audio();
trilhaSonoraFases.src = "SOUND/NEVE.mp3"; // Caminho do áudio
trilhaSonoraFases.loop = true; // Loop contínuo

// Som do pulo
var somPulo = new Audio();
somPulo.src = "SOUND/PULO.mp3"; // Caminho do áudio
somPulo.loop = false; // Não tem loop
somPulo.currentTime = 0;

// Som da morte
var pancada = new Audio();
pancada.src = "SOUND/DANO.mp3"; // Caminho do áudio
pancada.loop = false; // Não tem loop
pancada.currentTime = 0;

// Som da colisão
var gemido = new Audio();
gemido.src = "SOUND/GEMIDO.mp3"; // Caminho do áudio
gemido.loop = false; // Não tem loop
gemido.currentTime = 0;

// Som da vitória
var somVitoria = new Audio();
somVitoria.src = "SOUND/SOM DA VITORIA.mp3"; // Caminho do áudio
somVitoria.loop = false; // Não tem loop
somVitoria.currentTime = 0;

// Som correndo
var somCorrida = new Audio();
somCorrida.src = "SOUND/CORRENDO.mp3"; // Caminho do áudio
somCorrida.loop = false; // Não tem loop
somCorrida.currentTime = 0;

// Fase da neve --------------------------------------------------------------------------------------

// Carrega a imagem do fundo
var fundoImagem = new Image(); // Novo objeto de imagem
fundoImagem.src = "IMG/cenario.png"; // Caminho da imagem

// Carrega a spritesheet do personagem
var personagemImagem = new Image(); // Novo objeto de imagem
personagemImagem.src = "IMG/esquimo.png"; // Caminho da imagem

// Carrega a spritesheet do NPC
var npcImagem = new Image(); // Novo objeto de imagem
npcImagem.src = "IMG/moradora.png"; // Caminho da imagem do NPC

// Carrega a imagem do cubo de gelo
var cuboGeloImagem = new Image(); // Novo objeto de imagem
cuboGeloImagem.src = "IMG/cuboGelo.png"; // Caminho da imagem

// Carrega a imagem do yeti
var yetiImagem = new Image(); // Novo objeto de imagem
yetiImagem.src = "IMG/yeti.png"; // Caminho da imagem

var avalancheImagem = new Image(); // Novo objeto de imagem
avalancheImagem.src = "IMG/avalanche.png"; // Caminho da imagem

// Configurações do fundo
var fundoX = 0;
var velocidadeFundo = 6; // Velocidade do movimento

// Configurações do personagem (declaração global)
var frameIndex = 0; // Índice do quadro atual da spritesheet
var numFrames = 2; // Número total de quadros na spritesheet
var frameLargura = 125; // Largura de cada quadro na spritesheet
var frameAltura = 140; // Altura de cada quadro na spritesheet
var personagemX = 500; // Posição X do personagem no canvas
var velocidadePersonagemDireita = 0.2; // Velocidade de movimento para a direita (0.2)
var personagemY = canvas.height - frameAltura; // Posição Y do personagem no canvas
var velocidadeY = 0; // Velocidade vertical do personagem
var gravidade = 0.4; // Força de gravidade
var forcaPulo = -16; // Força do pulo (valor negativo para ir para cima no eixo Y)
var pulando = false; // Verifica se o personagem está no ar

// Posição final (ponto onde o personagem atinge o fim)
var posicaoFinal = canvas.width - larguraFrame - 50; // 50px de margem no final

// Abaixar variáveis
var abaixado = false;
var abaixando = false;
var levantando = false;
var abaixaQuando = 30; // Quantidade para mover suavemente

// Frames personagem
var frameSpeed = 10; // Velocidade da animação (menor é mais rápido)
var frameContadorPersonagem = 0; // Contador de quadros para controlar a velocidade da animação

// Configurações do NPC
var npcFrameIndex = 0; // Índice do quadro atual da spritesheet do NPC
var npcNumFrames = 5; // Número total de quadros na spritesheet do NPC
var npcFrameLargura = 250; // Largura de cada quadro na spritesheet
var npcFrameAltura = 250; // Altura de cada quadro na spritesheet
var npcX = canvas.width + 350; // Posição inicial do NPC à direita da tela
var npcY = canvas.height - 360; // Posição Y no canvas (no chão)
var velocidadeNpc = 1.5; // Velocidade do NPC para a esquerda
var npcAtivo = false; // Verifica se o NPC está ativo ou não
var npcCentro = canvas.width - 500; // Posição que o NPC irá parar na tela
var npcParado = false; // Para verificar se o NPC está parado
var tempoParado = 2000; // Tempo em milissegundos que o NPC ficará parado no centro
var npcMovendoDireita = false; // Verifica se o NPC está movendo para a direita

// Frames NPC
var npcFrameSpeed = 12; // Velocidade da animação do NPC
var npcFrameContador = 0; // Contador de quadros para controlar a animação

// Configurações da avalanche
var indexFrame = 0; // Índice do quadro atual da spritesheet
var numeroDeFrames = 5; // Número total de quadros na spritesheet
var larguraFrame = 500; // Largura de cada quadro na spritesheet
var alturaFrame = 440; // Altura de cada quadro na spritesheet
var avalancheX = -500; // Posição X da avalanche no canvas
var avalancheVelocidade = 1; // Velocidade que a avalanche se moverá
var avalancheY = canvas.height - alturaFrame; // Posição Y da avalanche no canvas
var avalancheMovendo = false; // Variável que controla quando a avalanche se moverá

// Frames avalanche
var velocidadeFrameAvalanche = 12; // Velocidade da animação
var frameContadorAvalanche = 0; // Contador de quadros para controlar a velocidade da animação

// Variável para controlar a pausa do jogo
var jogoPausado = false; // O jogo começa rodando

// Variável que controlará quando o jogo for dar game over
var gameOver = false; // Começa falso

var obstaculos = []; // Array para armazenar os obstáculos

// Flags de fase
var faseTrocada = false; // Irá definir se a fase foi trocada ou não
var faseTrocadaParaTerceira = false; // Define se a fase foi trocada para a terceira fase

// Transição de fase
var transicaoDeFase = false;
var mostrarPrimeiroAviso = false; // Inicia falso
var mostrarSegundoAviso = false; // Inicia falso
var tempoAviso = 3000; // 3 segundos para o aviso

// Carrega as imagens da segunda fase
var fundoImagemFase2 = new Image(); // Novo objeto de imagem
fundoImagemFase2.src = "IMG/savana.png"; // Caminho da imagem

var personagemImagemFase2 = new Image(); // Novo objeto de imagem
personagemImagemFase2.src = "IMG/esquimoLenhador.png"; // Caminho da imagem

var npcImagemFase2 = new Image(); // Novo objeto de imagem
npcImagemFase2.src = "IMG/moradoraLenhadora.png"; // Caminho da imagem do NPC

var imgUrso = new Image(); // Novo objeto de imagem
imgUrso.src = "IMG/urso.png"; // Caminho da imagem

var arbusto = new Image(); // Novo objeto de imagem
arbusto.src = "IMG/arbusto.png"; // Caminho da imagem

var avalancheImagemFase2 = new Image(); // Novo objeto de imagem
avalancheImagemFase2.src = "IMG/troncosAvalanche.png"; // Caminho da imagem

// ALterando os frames do personagem da fase 2
var numFramesPersonagem2 = 2; // Número total de quadros na spritesheet

// Alterando a altura e largura do NPC
var npcFrameAlturaFase2 = 125; // Altura
var npcFrameLarguraFase2 = 125; // Largura

// Alterando a posiçao y do NPC da fase 2
var npcFase2Y = canvas.height - 150; // Posição Y no canvas (no chão)

// Carrega as imagens da terceira fase
var fundoImagemFase3 = new Image();
fundoImagemFase3.src = "IMG/cenarioAreia.png"; // Caminho da nova imagem do cenário

var personagemImagemFase3 = new Image();
personagemImagemFase3.src = "IMG/esquimoSunguinha.png"; // Caminho da nova spritesheet do personagem

var npcImagemFase3 = new Image();
npcImagemFase3.src = "IMG/moradoraBiquini.png"; // Caminho da nova spritesheet do NPC

var imgGaivota = new Image();
imgGaivota.src = "IMG/gaivota.png"; // Caminho do novo obstáculo

var castelinho = new Image();
castelinho.src = "IMG/casteloAreia.png"; // Caminho da nova imagem do obstáculo

var avalancheImagemFase3 = new Image();
avalancheImagemFase3.src = "IMG/agua.png"; // Caminho da nova avalanche

var numFramesPersonagem3 = 2; // Alterando os frames do personagem da fase 3

// Alterando a altura e largura do NPC para a fase 3
var npcFrameAlturaFase3 = 250; // Altura do NPC na terceira fase
var npcFrameLarguraFase3 = 241; // Largura do NPC

// Alterando a posição Y do NPC para a fase 3
var npcFase3Y = canvas.height - 300; // Ajustando a posição Y do NPC

// Função para trocar para a segunda fase
function trocarFaseParaSegunda(){
    // Trocar as variáveis de imagens da primeira para a segunda fase
    fundoImagem = fundoImagemFase2;
    personagemImagem = personagemImagemFase2;
    npcImagem = npcImagemFase2;
    cuboGeloImagem = imgUrso;
    yetiImagem = arbusto;
    avalancheImagem = avalancheImagemFase2;

    // Reseta as variáveis da fase 2
    fundoX = 0; // Reseta a posição do fundo
    velocidadeFundo = 6; // Mantém a mesma velocidade de fundo
    
    // Reset para o personagem
    personagemX = 300;
    personagemY = canvas.height - frameAltura;

    // Modificando a quantidade de frames da spritesheet do personagem
    numFrames = numFramesPersonagem2;

    // Alterando a altura e largura do NPC
    npcFrameAltura = npcFrameAlturaFase2; // Altura
    npcFrameLargura = npcFrameLarguraFase2; // Largura
    
    // Reset para o NPC
    npcX = canvas.width + 350;
    npcY = npcFase2Y;
    npcAtivo = true;
    npcParado = false;
    npcMovendoDireita = false;
    
    // Reinicia a avalanche para a nova fase
    avalancheX = -500;
    avalancheMovendo = false;

    obstaculos = []; // Limpa o array de obstáculos

    faseTrocada = true; // Marca que a fase foi trocada para a segunda
}

// Função para trocar para a terceira fase
function trocarFaseParaTerceira(){
    // Trocar as variáveis de imagens para a terceira fase
    fundoImagem = fundoImagemFase3;
    personagemImagem = personagemImagemFase3;
    npcImagem = npcImagemFase3;
    cuboGeloImagem = imgGaivota;
    yetiImagem = castelinho;
    avalancheImagem = avalancheImagemFase3;

    // Reseta as variáveis da terceira fase
    fundoX = 0; // Reseta a posição do fundo
    velocidadeFundo = 6; // Mantém a mesma velocidade de fundo
    
    // Reset para o personagem
    personagemX = 400;
    personagemY = canvas.height - frameAltura;

    // Modificando a quantidade de frames da spritesheet do personagem
    numFrames = numFramesPersonagem3;

    // Alterando a altura e largura do NPC
    npcFrameAltura = npcFrameAlturaFase3; // Nova altura
    npcFrameLargura = npcFrameLarguraFase3; // Nova largura
    
    // Reset para o NPC
    npcX = canvas.width + 350;
    npcY = npcFase3Y;
    npcAtivo = true;
    npcParado = false;
    npcMovendoDireita = false;

    // Reinicia a avalanche para a nova fase
    avalancheX = -500;
    avalancheMovendo = false;

    obstaculos = []; // Limpa os obstáculos da fase anterior

    faseTrocadaParaTerceira = true; // Marca que a segunda fase foi trocada para a terceira
}

// Função para reiniciar o jogo
function reiniciarJogo(){
    // Cancela o loop anterior para não ter mais de um trabalhando no novo jogo
    cancelAnimationFrame(requestID); // Cancela o loop anterior

    // Reseta as variáveis principais do jogo
    personagemX = 500; // Posição inicial do personagem
    personagemY = canvas.height - frameAltura; // Posiciona o personagem no chão
    velocidadeY = 0; // Reseta a velocidade vertical
    pulando = false; // Define o personagem inicialmente no chão
    abaixado = false; // Define o personagem inicialmente como não abaixado
    abaixando = false; // Define o estado atual dele como não abaixando
    levantando = false; // Define o estado atual dele como não levantando, já que não está abaixado
    
    // Reinicializa o estado do NPC conforme a fase
    if(faseTrocada){
        npcX = canvas.width + 1000;
        npcY = npcFase2Y;
        npcAtivo = true;
        npcParado = false;
        npcMovendoDireita = false;
    }
    else if(faseTrocadaParaTerceira){
        npcX = canvas.width + 1000;
        npcY = npcFase3Y;
        npcAtivo = true;
        npcParado = false;
        npcMovendoDireita = false;
    }
    else{
        npcX = canvas.width + 1000;
        npcY = canvas.height - 320;
        npcAtivo = true;
        npcParado = false;
        npcMovendoDireita = false;
    }

    obstaculos = []; // Limpa os obstáculos
    gameOver = false; // Remove o estado de game over
    botaoNovoJogo.style.display = "none"; // Esconde o botão Jogar Novamente

    avalancheX = -500; // Reposiciona a avalanche no início
    avalancheMovendo = false; // Reseta o estado da avalanche
    fundoX = 0; // Reseta a posição do fundo

    // Reinicia outras variáveis relevantes do jogo
    velocidadePersonagemDireita = 0.2; // Velocidade do personagem para a direita

    loopJogo(); // Chama o loop novamente

    // Se não estiver mutado...
    if(permissaoParaMutarMusicas){
        trilhaSonoraFases.play(); // Chama novamente a trilha sonora
    }
}

// Variável que controla se os personagens vão ser criados ou não
var autorizacaoParaCriar = false; // Inicialmente declarada como falsa

var tipoDoObstaculo; // Variável global que armazena tipo do obstáculo

// Função para criar novos obstáculos
function criarObstaculo(){
    if(!autorizacaoParaCriar) return; // Se a variável for verdadeira, a função retorna o valor

    // Define aleatoriamente se será um cubo de gelo ou um Yeti
    var tipoObstaculo = Math.random() > 0.5 ? "cuboGelo" : "yeti";

    // Número aleatório para a altura da ave na terceira fase
    var numeroAleatorioPassaro = Math.random() * (220 - 100) + 200;

    // Número aleatório do arbusto na segunda fase
    var numeroAleatorioArbustoTamanho = Math.random() * (300 - 270) + 270;

    // Número aleatório do tamanho do gelo na primeira fase
    var numeroAleatorioGeloTamanho = Math.random() * (220 - 180) + 180;

    // Número aleatório do yeti na primeira fase
    var numeroAleatorioYeti = Math.random() * (260 - 240) + 220;
    
    // Dependendo da fase, as variáveis são de valores diferentes
    var obstaculo; // Declara a variável vazia para atribuir a ela os valores

    // Valores são atribuídos para a variável vazia
    if(!faseTrocada){
        // Define as propriedades do obstáculo para a primeira fase
        obstaculo = { // Primeira fase
            x: canvas.width, // Começa fora da tela, na direita
            y: canvas.height - (tipoObstaculo === "cuboGelo" ? 200 : numeroAleatorioYeti), // Altura diferente para cubo de gelo e Yeti
            largura: tipoObstaculo === "cuboGelo" ? numeroAleatorioGeloTamanho : 190, // Tamanhos diferentes
            altura: tipoObstaculo === "cuboGelo" ? numeroAleatorioGeloTamanho : 200,
            tipo: tipoObstaculo
        };

        tipoDoObstaculo = tipoObstaculo; // Atribuindo para a variável global o tipo do obstáculo
    }
    else if(!faseTrocadaParaTerceira){
        // Define as propriedades do obstáculo para a segunda fase
        obstaculo = { // Segunda fase
            x: canvas.width, // Começa fora da tela, na direita
            y: canvas.height - (tipoObstaculo === "cuboGelo" ? 240 : 230), // Altura diferente para cubo de gelo e Yeti
            largura: tipoObstaculo === "cuboGelo" ? 240 : numeroAleatorioArbustoTamanho, // Tamanhos diferentes
            altura: tipoObstaculo === "cuboGelo" ? 240 : numeroAleatorioArbustoTamanho,
            tipo: tipoObstaculo
        };

        tipoDoObstaculo = tipoObstaculo; // Atribuindo para a variável global o tipo do obstáculo
    }
    else{
        // Define as propriedades do obstáculo para a terceira fase
        obstaculo = { // Terceira fase
            x: canvas.width, // Começa fora da tela, na direita
            y: canvas.height - (tipoObstaculo === "cuboGelo" ? numeroAleatorioPassaro : 230), // Altura igual para ambos
            largura: tipoObstaculo === "cuboGelo" ? 200 : 220, // Tamanhos diferentes
            altura: tipoObstaculo === "cuboGelo" ? 200 : 240,
            tipo: tipoObstaculo
        };

        tipoDoObstaculo = tipoObstaculo; // Atribuindo para a variável global o tipo do obstáculo
    }
    
    obstaculos.push(obstaculo); // Adiciona o obstáculo no array
}

// Função que move e desenha os obstáculos
function atualizarObstaculos(){
    // Atualiza a posição dos obstáculos
    for(var i = 0; i < obstaculos.length; i++){
        var obstaculo = obstaculos[i];

        // Se a fase é a terceira...
        if(faseTrocadaParaTerceira){
            if(tipoDoObstaculo === "cuboGelo"){ // Se o obstáculo for a gaivota...
                obstaculo.x -= velocidadeFundo + 1.5; // A velocidade é maior, já que ela voa
            }else{ // Caso o obstáculo não for a gaivota...
                obstaculo.x -= velocidadeFundo; // Move o obstáculo para a esquerda normalmente
            }
        }
        // Se a fase é a segunda...
        else if(faseTrocada){
            if(tipoDoObstaculo === "cuboGelo"){ // Se o obstáculo for o urso...
                obstaculo.x -= velocidadeFundo + 1; // A velocidade é maior
            }else{ // Caso o obstáculo não for o urso...
                obstaculo.x -= velocidadeFundo; // Move o obstáculo para a esquerda normalmente
            }
        }
        else{ // Caso não for a terceira fase ou a segunda...
            obstaculo.x -= velocidadeFundo; // Move o obstáculo para a esquerda normalmente
        }

        // Desenha o obstáculo no canvas
        if(obstaculo.tipo === "cuboGelo"){
            context.drawImage(cuboGeloImagem, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
        }
        else if (obstaculo.tipo === "yeti"){
            context.drawImage(yetiImagem, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
        }
    }

    // Remove obstáculos que saíram da tela
    obstaculos = obstaculos.filter(obstaculo => obstaculo.x + obstaculo.largura > 0);
}

// Função que desenha e move o fundo
function desenharFundo(){
    var canvasWidth = canvas.width; // Definindo a largura do canvas em variável
    var canvasHeight = canvas.height; // Definindo a altura do canvas em variável

    // Desenhando a imagem
    context.drawImage(fundoImagem, fundoX, 0, canvasWidth, canvasHeight);
    context.drawImage(fundoImagem, fundoX + canvasWidth, 0, canvasWidth, canvasHeight);

    fundoX -= velocidadeFundo; // Decrementando a posição X para o fundo mexer

    // Atualizando a posição do fundo
    if(fundoX <= -canvasWidth){ // Caso a imagem sair totalmente do canvas:
        fundoX = 0;
    }
}

function moverAvalanche(){
    if(!avalancheMovendo){
        // Movimenta a avalanche até uma posição fixa
        avalancheX += avalancheVelocidade;
        if(avalancheX >= 0){ // Posição onde a avalanche deve parar
            avalancheX = 0;
            avalancheMovendo = true; // Avalanche para de se mover
        }
    }
}

// Função que desenha e anima o personagem
function desenharPersonagem(){
    // Controla a velocidade da animação
    frameContadorPersonagem++;

    // A animação só funciona quando o personagem está no chão
    if(!pulando){
        // Caso o contador tenha o valor da velocidade de animação...
        if(frameContadorPersonagem >= frameSpeed){
            frameContadorPersonagem = 0; // Volta o contador de frames para 0
            frameIndex = (frameIndex + 1) % numFrames; // Passa para o próximo quadro
        }
    }else{
        frameIndex = 1; // A spritesheet fica parada no frame 1 enquanto ele está no ar
    }

    // Calcula a posição do quadro na spritesheet
    var frameX = frameIndex * frameLargura;

    // Desenha o personagem
    context.drawImage(personagemImagem, frameX, 0, frameLargura, frameAltura, personagemX, personagemY, frameLargura, frameAltura);
}

// Função que desenha e anima o NPC
function desenharNPC(){
    npcFrameContador++; // Controla a velocidade da animação do NPC

    if(npcFrameContador >= npcFrameSpeed){
        npcFrameContador = 0; // Reseta o contador de animação
        npcFrameIndex = (npcFrameIndex + 1) % npcNumFrames; // Atualiza o quadro da animação
    }

    // Calcula a posição do quadro na spritesheet do NPC
    var npcFrameX = npcFrameIndex * npcFrameLargura;

    // Desenha o NPC no canvas
    context.drawImage(npcImagem, npcFrameX, 0, npcFrameLargura, npcFrameAltura, npcX, npcY, npcFrameLargura, npcFrameAltura);

    if(!npcParado){
        if(npcX > npcCentro){
            npcX -= velocidadeNpc; // Move o NPC para a esquerda

            // Os inimigos não vem enquanto o NPC estiver na tela
            autorizacaoParaCriar = false; // Interrompe os obstáculos
        }
        else{
            // O NPC parou no centro
            npcX = npcCentro;
            npcParado = true;

            // O NPC ficará parado por um tempo e depois começará a se mover para a direita
            setTimeout(function(){
                npcMovendoDireita = true;
            }, tempoParado);
        }
    }
    else if(npcMovendoDireita){
        if(npcX < canvas.width){
            npcX += velocidadeNpc; // Move o NPC para a direita

            // Faz os inimigos virem
            autorizacaoParaCriar = true;
        }
        else{
            npcAtivo = false; // O NPC saiu da tela
        }
    }
}

// Função que desenha e anima a avalanche
function desenharAvalanche(){
    // Controla a velocidade da animação
    frameContadorAvalanche++;

    // Caso o contador tenha o valor da velocidade de animação...
    if(frameContadorAvalanche >= velocidadeFrameAvalanche){
        frameContadorAvalanche = 0; // Volta o contador de frames para 0
        indexFrame = (indexFrame + 1) % numeroDeFrames; // Passa para o próximo quadro
    }

    // Calcula a posição do quadro na spritesheet
    var frameAvalancheX = indexFrame * larguraFrame;

    // Desenha a avalanche
    context.drawImage(avalancheImagem, frameAvalancheX, 0, larguraFrame, alturaFrame, avalancheX, avalancheY, larguraFrame, alturaFrame);
}

// Função que atualiza a posição do personagem e aplica a gravidade
function atualizarPersonagem(){
    // Cálculo do progresso usando o tamanho do canvas
    var progresso = Number(((personagemX / canvas.width) * 100).toFixed(0)); // Porcentagem sem decimal
    desenharProgresso(progresso); // Chama a função que desenha o progresso

    // Valor do limite que o personagem alcança para aumentar a velocidade
    var aumentoVelocidade;

    //Dependendo da fase o valor é diferente
    if(faseTrocadaParaTerceira){ // Caso esteja na fase 3
        aumentoVelocidade = 160; // Valor diferente
    }else{ // Caso esteja nas outras fases
        aumentoVelocidade = 130; // Valor diferente
    }

    // Caso o personagem chegar quase no fim do canvas...
    if(personagemX + frameLargura >= canvas.width - aumentoVelocidade){
        velocidadePersonagemDireita = 1; // Acelera a velocidade do personagem
    }
    else if(personagemX + frameLargura <= canvas.width - aumentoVelocidade){
        velocidadePersonagemDireita = 0.2; // Move o personagem para a direita normalmente
    }

    // Movimentação para a direita
    if(personagemX < canvas.width){
        personagemX += velocidadePersonagemDireita; // Move o personagem para a direita
    }

    // Pulo
    if(pulando){
        velocidadeY += gravidade; // Aplica a gravidade
        personagemY += velocidadeY; // Atualiza a posição Y

        // Verifica se o personagem atingiu o chão
        if(personagemY >= canvas.height - frameAltura){
            personagemY = canvas.height - frameAltura; // Ajusta a posição ao chão
            pulando = false; // O personagem parou de pular
            velocidadeY = 0; // Zera a velocidade ao atingir o chão
        }
    }

    // Abaixando
    if(abaixando){
        if(personagemY < canvas.height - frameAltura + abaixaQuando){
            personagemY += 4; // Move para baixo suavemente
        } else {
            personagemY = canvas.height - frameAltura + abaixaQuando;
            abaixando = false;
            abaixado = true;
        }
    }

    // Levantando
    if(levantando){
        if(personagemY > canvas.height - frameAltura){
            personagemY -= 4; // Move para cima suavemente
        }else{
            personagemY = canvas.height - frameAltura;
            levantando = false;
            abaixado = false;
        }
    }
}

// Função para desenhar a porcentagem de progresso no canvas
function desenharProgresso(progresso){
    var corAviso; // Variável que armazenará  cor da letra do progresso

    // Na terceira fase a cor do aviso é diferente
    if(faseTrocadaParaTerceira){
        corAviso = "black";
    }
    else if(faseTrocada){
        corAviso = "white";
    }else{
        corAviso = "black";
    }

    // Dependendo a porcentagem do progresso, a cor do aviso é diferente
    if(progresso <= 25){
        corAviso = "red";
    }
    else if(progresso > 75){
        corAviso = "green";
    }

    context.font = "25px SUSE";
    context.fillStyle = corAviso;
    context.textAlign = "right";
    context.fillText("Progresso: " + progresso + "%", canvas.width - 20, 30); // Exibe no canto superior direito
}

// Flag booleana que permitirá o personagem de pular ou não
var permissaoParaPular = false;

// Função que faz o personagem pular
function pular(){
    // Retorna a função dependendo do valor da flag
    if(permissaoParaPular) return;

    // Se detectar que o personagem está no chão...
    if(!pulando){
        // Se não estiver mutado...
        if(permissaoParaMutarMusicas){
            somPulo.preload = "auto"; // Garante que o som seja carregado previamente
            somPulo.play(); // Faz barulho de pulo
        }

        pulando = true; // Marca que o personagem está pulando
        velocidadeY = forcaPulo; // Aplica a força do pulo
    }
}

// Função para abaixar o personagem
function abaixar(){
    if(!abaixando && !levantando && !abaixado){
        abaixando = true; // Inicia o abaixar
    }
}

// Função para verificar colisão entre o personagem e um obstáculo
function verificarColisao(obstaculo){
    var personagemDireita = personagemX + frameLargura;
    var personagemEsquerda = personagemX;
    var personagemTopo = personagemY;
    var personagemBase = personagemY + frameAltura;
    
    var obstaculoDireita = obstaculo.x + obstaculo.largura;
    var obstaculoEsquerda = obstaculo.x;
    var obstaculoTopo = obstaculo.y;
    var obstaculoBase = obstaculo.y + obstaculo.altura;

    // Dependendo da fase a margem é diferente
    var margemColisao;
    if(faseTrocadaParaTerceira){
        margemColisao = -60; // Margem para detectar colisão
    }
    else if(!faseTrocada){
        margemColisao = -100; // Margem para detectar colisão
    }
    else{
        margemColisao = -120; // Margem para detectar colisão
    }
    
    // Verifica se há sobreposição nas bordas (colisão)
    if(personagemDireita > obstaculoEsquerda - margemColisao &&
        personagemEsquerda < obstaculoDireita + margemColisao &&
        personagemBase > obstaculoTopo - margemColisao &&
        personagemTopo < obstaculoBase + margemColisao){
        return true; // Colisão detectada
    }
    return false;
}

// Função que verifica colisão com a avalanche
function verificarColisaoAvalanche(){
    var personagemDireita = personagemX + frameLargura;
    var avalancheDireita = avalancheX + larguraFrame;

    // Verifica se a avalanche encostou no personagem
    if(personagemDireita < avalancheDireita - 100){
        gameOver = true; // Marca que o jogo acabou

        // Se não estiver mutado...
        if(permissaoParaMutarMusicas){
            pancada.play(); // Faz o barulho de morte
        }
    }
}

// Função para desenhar a tela de game over
function desenharGameOver(){
    // Desenha uma camada semitransparente sobre o canvas
    context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Preto com 70% de opacidade
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Define o estilo do texto
    context.fillStyle = "white"; // Cor do texto
    context.font = "bold 48px SUSE"; // Estilo e tamanho da fonte
    context.textAlign = "center"; // Alinhamento central
    context.fillText("Você perdeu", canvas.width / 2, canvas.height / 2); // Desenha o texto no centro

    botaoNovoJogo.style.display = "block"; // Se o jogador morrer, aparece o botão de novo jogo

    trilhaSonoraFases.pause(); // Para a trilha sonora
}

// Função que move o personagem para trás quando há colisão
function moverPersonagemAposColisao(){
    // Flag booleana que definirá que o som de dano só tocará uma vez na colisão
    var somTocado = false; // Define quando o som de dano foi tocado

    // Verifica cada obstáculo no array global obstaculos
    for(var i = 0; i < obstaculos.length; i++){
        var obstaculo = obstaculos[i]; // Pega o obstáculo da lista

        if(verificarColisao(obstaculo)){
            // Mover o personagem para trás ao colidir
            personagemX -= 10; // Move o personagem para trás

            // Se não estiver mutado e a flag booleana for falsa...
            if(!somTocado && permissaoParaMutarMusicas){
                gemido.play(); // Faz o barulho de gemido
                somTocado = true; // Define que o barulho já foi tocado
            }
            
            if (personagemX < 0){
                personagemX = 0; // Evita que o personagem saia da tela
            }
        }else{
            // Se não houver colisão...
            somTocado = false; // Reseta a flag para permitir tocar o som novamente em futuras colisões
        }
    }
}

// Função que desenha a sobreposição escura e o texto "Jogo Pausado"
function desenharOverlayDePausa(){
    // Desenha uma camada semitransparente sobre o canvas
    context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Preto com 70% de opacidade
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Define o estilo do texto
    context.fillStyle = "white"; // Cor do texto
    context.font = "bold 48px SUSE"; // Estilo e tamanho da fonte
    context.textAlign = "center"; // Alinhamento central
    context.fillText("Jogo Pausado", canvas.width / 2, canvas.height / 2); // Desenha o texto no centro
}

// Variável para armazenar o ID do requestAnimationFrame
var requestID; // Armazenará o request para o novo jogo

// Variável para controlar a transição entre as fases
var transicaoDeFase = false;

// Aviso da fase 1 para a 2
var mostrarPrimeiroAviso = false; // Inicia falso

// Aviso da fase 2 para a 3
var mostrarSegundoAviso = false; // Inicia falso

var tempoAviso = 3000; // 3 segundos para o aviso

// Controla quando passará de fase
var autorizacaoParaPassarFase = false; // Inicia falso

// Flag booleana que permitirá o jogo de ser finalizado
var permissaoParaFinalizarJogo = false; // Inicia falso

// Função principal do jogo
function loopJogo(){
    // Dependendo da flag, o jogo roda
    if(permissaoParaRodarJogo) return;

    context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Se o jogo não está pausado nem perdido, chama as funções do jogo
    if(!jogoPausado && !gameOver){
        // Se não estamos em transição de fase, desenhar elementos da fase atual
        if(!transicaoDeFase){
            desenharFundo(); // Chama a função que desenha o fundo
            desenharNPC(); // Chama a função que desenha o NPC
            desenharPersonagem(); // Chama a função que desenha o personagem
            atualizarPersonagem(); // Chama a função que atualiza o personagem
            atualizarObstaculos(); // Chama a função que desenha e atualiza os obstáculos
            moverPersonagemAposColisao(); // Chama a função que arrasta o personagem
            moverAvalanche(); // Chama a função que move a avalanche
            desenharAvalanche(); // Chama a função que desenha a avalanche
            verificarColisaoAvalanche(); // Chama a função que verifica a colisão com a avalanche
        }

        // Função que chama a fase 2
        function atualizarFase1_2(){
            // Dependendo da flag, o jogo roda
            if(permissaoParaRodarJogo) return;

            // Ativa a transição de fase e o aviso da primeira para a segunda
            transicaoDeFase = true;
            mostrarPrimeiroAviso = true;

            // Faz o botão de pular aparecer
            pularVideo1_2.style.display = "block";

            video.style.display = "block"; // Exibe o vídeo

            canvas.style.display = "none"; // Esconde o canvas

            botaoMutar.style.display = "none"; // Esconde o botão de mutar

            video.play(); // Inicia a reprodução do vídeo

            somCorrida.play(); // Inicia o som da corrida

            // Impede a função de pular de funcionar
            permissaoParaPular = true;

            // Flag que impedirá ou permitirá as fases de passar quando apertar o botão de pular vídeo
            var permissaoParaPassar1_2 = false;

            // Caso o vídeo chegar ao fim
            video.addEventListener("ended", () => {
                // Se tiver permissão, a terminação do vídeo passa de fase
                if(permissaoParaPassar1_2) return;

                autorizacaoParaPassarFase = true; // Autoriza o jogo a mudar de fase

                somCorrida.pause(); // Pausa a trilha sonora dele correndo

                video.style.display = "none"; // Esconde o vídeo
                canvas.style.display = "block"; // Exibe novamente o canvas
                pularVideo1_2.style.display = "none"; // Esconde o botão de pular vídeo

                // Após 3 segundos, remove o aviso e chama a função da segunda fase
                setTimeout(() => {
                    if(autorizacaoParaPassarFase){
                        trocarFaseParaSegunda(); // Chama a função da segunda fase

                        // Permite que a função de pular funcione
                        permissaoParaPular = false;

                        // Muda a cor de fundo do botão de mutar
                        botaoMutar.style.backgroundColor = "#613DC1";

                        botaoMutar.style.display = "block"; // Exibe o botão de mutar

                        // Se não estiver mutado...
                        if(permissaoParaMutarMusicas){
                            // Inicia a trilha sonora do zero
                            trilhaSonoraFases.currentTime = 0;
                            trilhaSonoraFases.src = "SOUND/FLORESTA.mp3"; // Caminho do áudio
                            trilhaSonoraFases.load(); // Carrega antes de iniciar
                            trilhaSonoraFases.play(); // Inicia a música
                        }
                    
                        // Dois segundos após começar a fase, os inimigos são criados
                        setTimeout(() => {
                            autorizacaoParaCriar = true; // Cria novamente os obstáculos
                        }, 3000);

                        mostrarPrimeiroAviso = false; // Apaga o aviso
                        transicaoDeFase = false;
                        faseTrocada = true; // Marca que a primeira fase foi trocada para a segunda
                    }
                }, tempoAviso);
            });            

            // Adiciona o evento de clique para pular o vídeo
            pularVideo1_2.addEventListener("click", () => {
                // Muda a permissão, assim a mudança de fase não irá se repetir
                permissaoParaPassar1_2 = true;

                autorizacaoParaPassarFase = true; // Autoriza o jogo a mudar de fase

                video.pause(); // Pausa o vídeo

                somCorrida.pause(); // Pausa a trilha sonora dele correndo

                video.style.display = "none"; // Esconde o vídeo
                canvas.style.display = "block"; // Exibe novamente o canvas
                pularVideo1_2.style.display = "none"; // Esconde o botão de pular vídeo

                // Após 3 segundos, remove o aviso e chama a função da segunda fase
                setTimeout(() => {
                    if(autorizacaoParaPassarFase){
                        trocarFaseParaSegunda(); // Chama a função da segunda fase

                        // Permite que a função de pular funcione
                        permissaoParaPular = false;

                        // Muda a cor de fundo do botão
                        botaoMutar.style.backgroundColor = "#613DC1";

                        botaoMutar.style.display = "block"; // Exibe o botão de mutar

                        // Se não estiver mutado...
                        if(permissaoParaMutarMusicas){
                            // Inicia a trilha sonora do zero
                            trilhaSonoraFases.currentTime = 0;
                            trilhaSonoraFases.src = "SOUND/FLORESTA.mp3"; // Caminho do áudio
                            trilhaSonoraFases.load(); // Carrega antes de iniciar
                            trilhaSonoraFases.play(); // Inicia a música
                        }

                        // Dois segundos após começar a fase, os inimigos são criados
                        setTimeout(() => {
                            autorizacaoParaCriar = true; // Cria novamente os obstáculos
                        }, 3000);

                        mostrarPrimeiroAviso = false; // Apaga o aviso
                        transicaoDeFase = false;
                        faseTrocada = true; // Marca que a primeira fase foi trocada para a segunda
                    }
                }, tempoAviso);
            });
        }

        // Função que passa da fase 2 para a 3
        function atualizarFase2_3(){
            // Dependendo da flag, o jogo roda
            if(permissaoParaRodarJogo) return;

            // Se já estamos na segunda fase, ativa a transição para a terceira
            transicaoDeFase = true;
            mostrarSegundoAviso = true; // Mostra o segundo aviso

            pularVideo2_3.style.display = "block"; // Exibe o botão de pular vídeo

            videoFase2_3.style.display = "block"; // Exibe o vídeo

            canvas.style.display = "none"; // Esconde o canvas

            botaoMutar.style.display = "none"; // Esconde o botão de mutar

            videoFase2_3.play(); // Roda o vídeo

            somCorrida.play(); // Inicia o som da corrida

            // Impede a função de pular de funcionar
            permissaoParaPular = true;

            // Flag que impedirá ou permitirá as fases de passar quando apertar o botão de pular vídeo
            var permissaoParaPassar2_3 = false;

            // Adicionando evento de fim no vídeo
            videoFase2_3.addEventListener("ended", () => {
                // A função só funciona se o vídeo não foi pulado
                if(permissaoParaPassar2_3) return;

                somCorrida.pause(); // Pausa a trilha sonora dele correndo

                canvas.style.display = "block"; // Exibe o canvas
                pularVideo2_3.style.display = "none"; // Esconde o botão de pular
                videoFase2_3.style.display = "none"; // Esconde o vídeo

                // Após 3 segundos, remove o aviso e chama a função da terceira fase
                setTimeout(() => {
                    trocarFaseParaTerceira(); // Chama a função que carrega a terceira fase

                    // Permite que a função de pular funcione
                    permissaoParaPular = false;

                    // Muda a cor de fundo do botão de mutar
                    botaoMutar.style.backgroundColor = "#613DC1";

                    botaoMutar.style.display = "block"; // Exibe o botão de mutar

                    // Se não estiver mutado...
                    if(permissaoParaMutarMusicas){
                        // Inicia a trilha sonora do zero
                        trilhaSonoraFases.currentTime = 0;
                        trilhaSonoraFases.src = "SOUND/PRAIA.mp3"; // Caminho do áudio
                        trilhaSonoraFases.load(); // Carrega antes de iniciar
                        trilhaSonoraFases.play(); // Inicia a música
                    }

                    // Dois segundos após começar a fase, os inimigos são criados
                    setTimeout(() => {
                        autorizacaoParaCriar = true; // Cria novamente os obstáculos
                    }, 3000);

                    mostrarSegundoAviso = false;
                    transicaoDeFase = false;
                    faseTrocadaParaTerceira = true; // Marca que a segunda fase foi trocada para a terceira
                }, tempoAviso);
            });

            // Adicionando evento de clique
            pularVideo2_3.addEventListener("click", () => {
                // Muda a permissão ao pressionar o botão para a mudança de fase não repetir
                permissaoParaPassar2_3 = true;

                videoFase2_3.pause(); // Para o vídeo

                somCorrida.pause(); // Pausa a trilha sonora dele correndo

                canvas.style.display = "block"; // Exibe o canvas

                pularVideo2_3.style.display = "none"; // Esconde o botão de pular

                videoFase2_3.style.display = "none"; // Esconde o vídeo

                // Após 3 segundos, remove o aviso e chama a função da terceira fase
                setTimeout(() => {
                    trocarFaseParaTerceira(); // Chama a função que carrega a terceira fase

                    // Permite que a função de pular funcione
                    permissaoParaPular = false;

                    // Muda a cor de fundo do botão de mutar
                    botaoMutar.style.backgroundColor = "#613DC1";

                    botaoMutar.style.display = "block"; // Exibe o botão de mutar

                    // Se não estiver mutado...
                    if(permissaoParaMutarMusicas){
                        // Inicia a trilha sonora do zero
                        trilhaSonoraFases.currentTime = 0;
                        trilhaSonoraFases.src = "SOUND/PRAIA.mp3"; // Caminho do áudio
                        trilhaSonoraFases.load(); // Carrega antes de iniciar
                        trilhaSonoraFases.play(); // Inicia a música
                    }
                    
                    // Dois segundos após começar a fase, os inimigos são criados
                    setTimeout(() => {
                        autorizacaoParaCriar = true; // Cria novamente os obstáculos
                    }, 3000);

                    mostrarSegundoAviso = false;
                    transicaoDeFase = false;
                    faseTrocadaParaTerceira = true; // Marca que a segunda fase foi trocada para a terceira
                }, tempoAviso);
            });
        }

        // Flag booleana que irá finalizar o jogo
        var podeFinalizar = false; // Inicia falsa

        // Função que finalizará o jogo
        function finalizarJogo(){
            // Dependendo da flag, o jogo funciona ou não
            if(podeFinalizar) return;

            // Modifica a posição x do personagem
            personagemX = canvas.width / 2;

            // Impede a função de pular de funcionar
            permissaoParaPular = true;

            // Impede o jogo inteiro de ser rodado
            permissaoParaRodarJogo = true;

            // Mensagem que será exibida
            var mensagem = "Você conseguiu sobreviver";

            // Limpa o canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Esconde todos os botões
            document.getElementById("divBotoes").style.display = "none";

            // Desenha uma camada semitransparente sobre o canvas
            context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Preto com 70% de opacidade
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Define o estilo do texto
            context.fillStyle = "white"; // Cor do texto
            context.font = "bold 48px SUSE"; // Estilo e tamanho da fonte
            context.textAlign = "center"; // Alinhamento central
            context.fillText(mensagem, canvas.width / 2, canvas.height / 2); // Desenha o texto no centro
        }

        // Variável que terá a margem limite para os obstáculos aparecerem
        var limiteObstaculosAparecem;

        if(faseTrocadaParaTerceira){ // Caso for na terceira fase
            limiteObstaculosAparecem = 180; // Valor diferente
        }
        else{ // Caso for nas outras fases
            limiteObstaculosAparecem = 150; // Valor diferente
        }

        // Quando o personagem chegar a um ponto no canvas...
        if(personagemX + frameLargura >= canvas.width - limiteObstaculosAparecem){
            autorizacaoParaCriar = false; // Para de criar os obstáculos
        }

        // Checa se o personagem chegou ao final da tela para trocar de fase
        if(personagemX >= canvas.width){
            trilhaSonoraFases.pause(); // Pausa a trilha sonora

            // Caso estiver mutado...
            if(!permissaoParaMutarMusicas){
                // Faz o áudio voltar a funcionar
                permissaoParaMutarMusicas = !permissaoParaMutarMusicas;

                // Muda o que está escrito no botão
                botaoMutar.value = "Mutar";
            }

            // Transição dependendo da fase que o jogador se encontra
            if(!faseTrocada && !transicaoDeFase){
                atualizarFase1_2(); // Chama a função que atualiza as fases
            }else if(faseTrocada && !faseTrocadaParaTerceira && !transicaoDeFase){
                atualizarFase2_3(); // Chama a função que atualiza as fases
            }else if(faseTrocadaParaTerceira && !transicaoDeFase){
                finalizarJogo(); // Chamando a função que finaliza o jogo

                // Após 3 segundos, chama uma função anônima
                setTimeout(function(){
                    canvas.style.display = "none"; // Esconde o canvas

                    videoFinal.style.display = "block"; // Exibe o vídeo na tela
                    videoFinal.loop = false; // Não tem loop

                    // Roda o vídeo da cutscene final
                    videoFinal.play();

                    // Roda o som da vitória
                    somVitoria.play();
                }, 3000); // Após 3 segundos
            }
        }

        // Evento de escuta quando o vídeo final acabar
        videoFinal.addEventListener("ended", () => {
            videoFinal.style.display = "none"; // Esconde o vídeo

            // Exibe a imagem da logo na tela
            imgLogoJogo.style.display = "block";

            textoFinal.style.display = "block"; // Exibe o texto na tela

            btnAvancar.style.display = "block"; // Exibe o botão de avançar
        });

        // Se o aviso de transição está ativo, exibe o aviso
        if(mostrarPrimeiroAviso){
            context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Preto com 70% de opacidade
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Define o estilo do texto
            context.fillStyle = "white"; // Cor do texto
            context.font = "bold 48px SUSE"; // Estilo e tamanho da fonte
            context.textAlign = "center"; // Alinhamento central
            context.fillText("Fuja das árvores!", canvas.width / 2, canvas.height / 2); // Desenha o texto no centro
        }
        else if(mostrarSegundoAviso){
            context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Preto com 70% de opacidade
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Define o estilo do texto
            context.fillStyle = "white"; // Cor do texto
            context.font = "bold 48px SUSE"; // Estilo e tamanho da fonte
            context.textAlign = "center"; // Alinhamento central
            context.fillText("Fuja do tsunami!", canvas.width / 2, canvas.height / 2); // Desenha o texto no centro
        }
    // Caso a flag de game over estiver ativada
    }else if(gameOver){
        desenharGameOver(); // Chama a função que desenha a tela de game over
    }else{
        desenharOverlayDePausa(); // Chama a função que desenha a tela de pause
    }

    // Armazena numa variável o requestAnimationFrame, rodando a função principal do jogo
    requestID = requestAnimationFrame(loopJogo); // Rodando o jogo
}

// Flag que impedirá repetições de carregamento ao clicar sobre o botão de pular
var permissaoParaPularInicio = false; // Inicia como falsa

// Atualiza o início do jogo
fundoImagem.onload = personagemImagem.onload = () => {
    canvas.style.display = "none"; // Esconde o canvas

    videoInicial.style.display = "block"; // Exibe o vídeo
    videoInicial.play(); // Roda o vídeo

    // Impede a função de pular de funcionar
    permissaoParaPular = true;

    pularCutesceneInicio.style.display = "block"; // Exibe o botão de pular o vídeo

    // Evento de escuta caso o vídeo cutscene inicial termine
    videoInicial.addEventListener("ended", function(){
        if(permissaoParaPularInicio) return;

        pularCutesceneInicio.style.display = "none"; // Esconde o botão de pular

        canvas.style.display = "block"; // Exibe o canvas

        trilhaSonoraFases.pause(); // Pausa a trilha sonora

        // Variável de contagem que definirá quanto tempo a tela de início ficará ativa
        var contagemRegressiva = 3; // Contagem regressiva de 3 segundos

        videoInicial.style.display = "none"; // Esconde o vídeo

        // Função que exibirá a contagem
        function exibirContagem(){
            // Limpa o canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Define o fundo com 70% de opacidade
            context.fillStyle = "rgba(0, 0, 0, 0.7)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Define o estilo do texto
            context.fillStyle = "white";
            context.font = "bold 48px SUSE";
            context.textAlign = "center";

            if(contagemRegressiva > 0){
                // Exibe o número da contagem regressiva
                context.fillText("Corra em " + contagemRegressiva, canvas.width / 2, canvas.height / 2);
            }else{
                // Quando a contagem chegar a zero, exibe a mensagem e inicia o jogo
                context.fillText("Fuja da avalanche!", canvas.width / 2, canvas.height / 2);

                // Inicia o jogo após uma pequena pausa
                setTimeout(function(){
                    loopJogo(); // Chama a função principal do jogo

                    // Permite que a função de pular funcione
                    permissaoParaPular = false;

                    // Permite a função de pular para funcionar
                    permissaoParaPular = false;

                    botaoMutar.style.display = "block"; // Exibe o botão de mutar

                    // Se não estiver mutado...
                    if(permissaoParaMutarMusicas){
                        trilhaSonoraFases.play(); // Inicia a trilha sonora
                    }
                    else if(!permissaoParaMutarMusicas){
                        trilhaSonoraFases.pause(); // Pausa a trilha sonora
                    }

                    // Dois segundos após começar a fase, os inimigos são criados
                    setTimeout(() => {
                        autorizacaoParaCriar = true; // Cria os obstáculos
                    }, 2000);

                    // Limpa os obstáculos antes de começar a contagem regressiva
                    obstaculos = []; // Limpa o array de obstáculos
                }, 1000); // Inicia o jogo após 1 segundo
            }

            contagemRegressiva--; // Diminui a contagem
        }

        // Executa a função a cada 1 segundo (1000ms)
        var intervalo = setInterval(function() {
            exibirContagem(); // Chama a função que exibe a contagem regressiva

            // Para a contagem quando atingir 0
            if (contagemRegressiva < 0) {
                clearInterval(intervalo);
            }
        }, 1000); // Intervalo de 1 segundo
    });

    // Evento de escuta caso o botão de pular o vídeo seja clicado
    pularCutesceneInicio.addEventListener("click", function(){
        permissaoParaPularInicio = true; // Desativa o evento de escuta de fim do vídeo

        videoInicial.pause(); // Pausa o vídeo

        pularCutesceneInicio.style.display = "none"; // Esconde o botão de pular

        canvas.style.display = "block"; // Exibe o canvas

        var contagemRegressiva = 3; // Contagem regressiva de 3 segundos

        videoInicial.style.display = "none"; // Esconde o vídeo

        // Exibe a contagem na tela
        function exibirContagem(){
            // Limpa o canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Define o fundo com 70% de opacidade
            context.fillStyle = "rgba(0, 0, 0, 0.7)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Define o estilo do texto
            context.fillStyle = "white";
            context.font = "bold 48px SUSE";
            context.textAlign = "center";

            if(contagemRegressiva > 0){
                // Exibe o número da contagem regressiva
                context.fillText("Corra em " + contagemRegressiva, canvas.width / 2, canvas.height / 2);
            }else{
                // Quando a contagem chegar a zero, exibe a mensagem e inicia o jogo
                context.fillText("Fuja da avalanche!", canvas.width / 2, canvas.height / 2);

                // Inicia o jogo após uma pequena pausa
                setTimeout(function(){
                    loopJogo(); // Chama a função principal do jogo

                    // Permite que a função de pular funcione
                    permissaoParaPular = false;

                    botaoMutar.style.display = "block"; // Exibe o botão de mutar

                    // Se não estiver mutado...
                    if(permissaoParaMutarMusicas){
                        trilhaSonoraFases.play(); // Inicia a trilha sonora
                    }
                    else if(!permissaoParaMutarMusicas){
                        trilhaSonoraFases.pause();
                    }

                    // Dois segundos após começar a fase, os inimigos são criados
                    setTimeout(() => {
                        autorizacaoParaCriar = true; // Cria os obstáculos
                    }, 2000);

                    // Limpa os obstáculos antes de começar a contagem regressiva
                    obstaculos = []; // Limpa o array de obstáculos
                }, 1000); // Inicia o jogo após 1 segundo
            }

            contagemRegressiva--; // Diminui a contagem
        }

        // Executa a função a cada 1 segundo (1000ms)
        var intervalo = setInterval(function() {
            exibirContagem(); // Chama a função que exibe a contagem regressiva

            // Para a contagem quando atingir 0
            if (contagemRegressiva < 0) {
                clearInterval(intervalo);
            }
        }, 1000); // Intervalo de 1 segundo
    });
};

// Função para alternar o estado de pausa
function alternarPausa(){
    jogoPausado = !jogoPausado; // Inverte o estado de pausa

    if(!jogoPausado){
        // Caso houverem mais de dois obstáculos na tela quando despausar...
        if(obstaculos.length > 2){
            obstaculos = []; // Limpa o array de obstáculos
        }

        // Permite que obstáculos sejam criados quando o jogo não está pausado
        autorizacaoParaCriar = true;

        if(permissaoParaMutarMusicas){
            // Áudio começa do início quando despausar
            trilhaSonoraFases.currentTime = 0;
            trilhaSonoraFases.play();

            // Faz com que a função pular funcione
            permissaoParaPular = false;
        }
    }else{
        // Impede que obstáculos sejam criados quando o jogo está pausado
        autorizacaoParaCriar = false;

        // Quando pausado, o áudio para
        trilhaSonoraFases.pause();

        // Impede a função de pulo de funcionar
        permissaoParaPular = true; 
    }
}

// Evento para detectar a tecla 'W' e fazer o personagem pular
document.addEventListener('keydown', function(event){
    // Se detectar evento na tecla do W...
    if(event.code === 'KeyW'){
        pular(); // Chama a função de pulo
    }

    // Se detectar evento na tecla de setinha...
    if(event.code === 'ArrowUp'){
        pular(); // Chama a função de pulo
    }

    // Se detectar evento na tecla de espaço...
    if(event.code === 'Space'){
        pular(); // Chama a função de pulo
    }

    // Evento para detectar a tecla 'S' para abaixar
    document.addEventListener('keydown', function(event){
        // Só quando estiver na terceira fase
        if(faseTrocadaParaTerceira){
            if(event.code === 'KeyS'){
                abaixar(); // Chama a função que o permite abaixar-se
            }
        }
    });

    // Evento para detectar o levantamento ao soltar a tecla 'S'
    document.addEventListener('keyup', function(event){
        // Só quando estiver na terceira fase
        if(faseTrocadaParaTerceira){
            if(event.code === 'KeyS'){
                abaixando = false; // Declara que o personagem não está abaixando
                levantando = true; // Inicia o levantar
            }
        }
    });

    // Evento para detectar a tecla da setinha para abaixar
    document.addEventListener('keydown', function(event){
        // Só quando estiver na terceira fase
        if(faseTrocadaParaTerceira){
            if(event.code === 'ArrowDown'){
                abaixar(); // Chama a função que o permite abaixar-se
            }
        }
    });

    // Evento para detectar o levantamento ao soltar a tecla da setinha
    document.addEventListener('keyup', function(event){
        // Só quando estiver na terceira fase
        if(faseTrocadaParaTerceira){
            if(event.code === 'ArrowDown'){
                abaixando = false; // Declara que o personagem não está abaixando
                levantando = true; // Inicia o levantar
            }
        }
    });

    // Detecta a tecla Enter para alternar entre pausar/despausar o jogo
    if(event.code === 'Enter') {
        alternarPausa(); // Chama a função que altera a variável de pausamento
    }
});

// Intervalo para criar novos obstáculos a cada 2 segundos
setInterval(function(){
    // Chama apenas quando não estiver com o jogo parado
    if (!jogoPausado || !gameOver){
        criarObstaculo(); // Chama a função que cria os obstáculos
    }
}, 2000); // A cada 2000ms (2 segundos), cria um novo obstáculo

// Função que reinicia o jogo após o jogador morrer
function reiniciarJogo(){
    cancelAnimationFrame(requestID); // Cancela a atualização do request

    //Redefine as posições do personagem
    personagemX = 500;
    personagemY = canvas.height - frameAltura;

    // Verifica qual fase o jogo se encontra para mudar as posições
    if (faseTrocadaParaTerceira){
        // Reinicializa o estado do NPC para a terceira fase
        npcX = canvas.width + 350;
        npcY = npcFase3Y; // Altera a posição Y do NPC
    }else if(faseTrocada){
        // Reinicializa o estado do NPC para a segunda fase
        npcX = canvas.width + 350;
        npcY = npcFase2Y; // Altera a posição Y do NPC
    }else{
        // Reinicializa o estado do NPC para a primeira fase
        npcX = canvas.width + 350;
        npcY = canvas.height - 320; // Altera a posição Y do NPC
    }

    // Redefine o NPC
    npcAtivo = true; // Define o NPC com ativo
    npcParado = false; // Define que o NPC está em movimento
    npcMovendoDireita = false; // Define que o NPC inicialmente se move para a esquerda

    obstaculos = []; // Limpa o array de obstáculos

    gameOver = false; // Define a variável de game over para falso

    botaoNovoJogo.style.display = "none"; // O botão de reiniciar some

    avalancheX = -500; // Posição X inicial da avalanche
    avalancheMovendo = false; // Define a avalanche como parada

    fundoX = 0; // Reseta a posição do fundo

    velocidadePersonagemDireita = 0.2; // Redefine a velocidade do personagem

    loopJogo(); // Chama novamente a função principal do jogo

    // Caso a flag de permissão de tocar músicas permitir...
    if(permissaoParaMutarMusicas){
        // Inicia a trilha sonora do zero
        trilhaSonoraFases.currentTime = 0;
        trilhaSonoraFases.play();
    }
}