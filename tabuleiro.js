
/** @format */

// Exibe ou esconde o jogo
function showMe() {
	const escondeJogo = document.getElementById('hidden');
	escondeJogo.style.display = (escondeJogo.style.display === '' || escondeJogo.style.display === 'none') ? 'block' : 'none';
}

// Função genérica para tocar sons
function tocarSom(src) {
	const audio = new Audio(src);
	audio.loop = false;
	audio.play();
}

const TocarMusicaInicio = () => tocarSom('sons/mario_inicio.mp3');
const TocarMusicaFim = () => tocarSom('sons/faustao_errou.mp3');
const TocarMusicaAcerto = () => tocarSom('sons/som_acerto.mp3');
const TocarMusicaErro = () => tocarSom('sons/zapsplat_erro_tentativa.mp3');
const TocarMusicaVitoria = () => tocarSom('sons/vitoria_sf.mp3');

//------------fim funções sons-----------------

//----------- função iniciar jogo ------------------


const iniciaBotao = document.querySelector('#btn-iniciar');
iniciaBotao.addEventListener('click', (event) => {
	event.preventDefault();
	TocarMusicaInicio();

	const escondeImagem = document.querySelector('.img-gif');
	escondeImagem.classList.add('fadeOut');

	setTimeout(() => escondeImagem.remove(), 1000);
	iniciaBotao.classList.add('fadeOut');

	setTimeout(() => showMe(), 1000);
});


let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria = '';
let palavraSecretaSorteada = '';


// Lista de palavras e categorias
const palavras = [
	// ANIMAIS E INSETOS
	{ nome: 'CACHORRO', categoria: 'ANIMAIS' },
	{ nome: 'GATO', categoria: 'ANIMAIS' },
	{ nome: 'CAVALO', categoria: 'ANIMAIS' },
	{ nome: 'ELEFANTE', categoria: 'ANIMAIS' },
	{ nome: 'LEAO', categoria: 'ANIMAIS' },
	{ nome: 'TIGRE', categoria: 'ANIMAIS' },
	{ nome: 'URSO', categoria: 'ANIMAIS' },
	{ nome: 'COELHO', categoria: 'ANIMAIS' },
	{ nome: 'MACACO', categoria: 'ANIMAIS' },
	{ nome: 'GIRAFA', categoria: 'ANIMAIS' },
	{ nome: 'PANDA', categoria: 'ANIMAIS' },
	{ nome: 'PINGUIM', categoria: 'ANIMAIS' },
	{ nome: 'TARTARUGA', categoria: 'ANIMAIS' },
	{ nome: 'JACARE', categoria: 'ANIMAIS' },
	{ nome: 'CROCODILO', categoria: 'ANIMAIS' },
	{ nome: 'RAPOSA', categoria: 'ANIMAIS' },
	{ nome: 'LOBO', categoria: 'ANIMAIS' },
	{ nome: 'ONCA', categoria: 'ANIMAIS' },
	{ nome: 'TAMANDUA', categoria: 'ANIMAIS' },
	{ nome: 'CAPIVARA', categoria: 'ANIMAIS' },
	{ nome: 'LONTRA', categoria: 'ANIMAIS' },
	{ nome: 'BORBOLETA', categoria: 'INSETO' },
	{ nome: 'ABELHA', categoria: 'INSETO' },
	{ nome: 'FORMIGA', categoria: 'INSETO' },
	{ nome: 'ARANHA', categoria: 'INSETO' },
	{ nome: 'CAMELO', categoria: 'ANIMAIS' },
	{ nome: 'DROMEDARIO', categoria: 'ANIMAIS' },
	{ nome: 'PATO', categoria: 'ANIMAIS' },
	{ nome: 'GANSO', categoria: 'ANIMAIS' },
	{ nome: 'GALINHA', categoria: 'ANIMAIS' },
	{ nome: 'GALO', categoria: 'ANIMAIS' },
	{ nome: 'PAVAO', categoria: 'ANIMAIS' },
	{ nome: 'PERU', categoria: 'ANIMAIS' },
	{ nome: 'PORCO', categoria: 'ANIMAIS' },
	{ nome: 'BOI', categoria: 'ANIMAIS' },
	{ nome: 'VACA', categoria: 'ANIMAIS' },
	{ nome: 'OVELHA', categoria: 'ANIMAIS' },
	{ nome: 'CABRA', categoria: 'ANIMAIS' },
	{ nome: 'JAGUATIRICA', categoria: 'ANIMAIS' },
	{ nome: 'QUATI', categoria: 'ANIMAIS' },
	// ITENS DE CASA
	{ nome: 'PRATO', categoria: 'ITENS DE CASA' },
	{ nome: 'ESPELHO', categoria: 'ITENS DE CASA' },
	{ nome: 'CADEIRA', categoria: 'ITENS DE CASA' },
	{ nome: 'ESTANTE', categoria: 'ITENS DE CASA' },
	{ nome: 'GELADEIRA', categoria: 'ITENS DE CASA' },
	{ nome: 'MAQUINA DE LAVAR', categoria: 'ITENS DE CASA' },
	{ nome: 'MICROONDAS', categoria: 'ITENS DE CASA' },
	{ nome: 'ARMARIO', categoria: 'ITENS DE CASA' },
	{ nome: 'PANELA', categoria: 'ITENS DE CASA' },
	{ nome: 'CHUVEIRO', categoria: 'ITENS DE CASA' },
	// Novos objetos de casa
	{ nome: 'SOFA', categoria: 'ITENS DE CASA' },
	{ nome: 'MESA', categoria: 'ITENS DE CASA' },
	{ nome: 'TAPETE', categoria: 'ITENS DE CASA' },
	{ nome: 'CORTINA', categoria: 'ITENS DE CASA' },
	{ nome: 'LUMINARIA', categoria: 'ITENS DE CASA' },
	{ nome: 'VENTILADOR', categoria: 'ITENS DE CASA' },
	{ nome: 'TELEVISAO', categoria: 'ITENS DE CASA' },
	{ nome: 'QUADRO', categoria: 'ITENS DE CASA' },
	{ nome: 'TRAVESSEIRO', categoria: 'ITENS DE CASA' },
	{ nome: 'COBERTOR', categoria: 'ITENS DE CASA' },
	{ nome: 'FRIGOBAR', categoria: 'ITENS DE CASA' },
	{ nome: 'LIVRO', categoria: 'ITENS DE CASA' },
	{ nome: 'ABAJUR', categoria: 'ITENS DE CASA' },
	{ nome: 'PORTA', categoria: 'ITENS DE CASA' },
	{ nome: 'JANELA', categoria: 'ITENS DE CASA' },
	{ nome: 'ROUPA DE CAMA', categoria: 'ITENS DE CASA' },
	{ nome: 'GUARDA ROUPA', categoria: 'ITENS DE CASA' },
	{ nome: 'LIXEIRA', categoria: 'ITENS DE CASA' },
	{ nome: 'ESCADA', categoria: 'ITENS DE CASA' },

	{ nome: 'REAL MADRID', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'BARCELONA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'BENFICA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'JUVENTUS', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'PORTUGUESA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'FLAMENGO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'PALMEIRAS', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'CORINTHIANS', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'SAO PAULO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'SANTOS', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'VASCO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'BOTAFOGO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'FLUMINENSE', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'GREMIO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'INTERNACIONAL', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'CRUZEIRO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'ATLETICO MINEIRO', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'ATHLETICO PARANAENSE', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'FORTALEZA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'CEARA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'SPORT', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'BAHIA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'GOIAS', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'CORITIBA', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'AVAI', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'FIGUEIRENSE', categoria: 'TIMES DE FUTEBOL' },
	{ nome: 'FERRARI', categoria: 'MARCAS DE CARROS' },
	{ nome: 'HYUNDAI', categoria: 'MARCAS DE CARROS' },
	{ nome: 'HONDA', categoria: 'MARCAS DE CARROS' },
	{ nome: 'MERCEDES', categoria: 'MARCAS DE CARROS' },
	{ nome: 'RENAULT', categoria: 'MARCAS DE CARROS' },
	{ nome: 'CHEVROLET', categoria: 'MARCAS DE CARROS' },
	{ nome: 'CITROEN', categoria: 'MARCAS DE CARROS' },
	{ nome: 'PEUGEOT', categoria: 'MARCAS DE CARROS' },
	{ nome: 'PORSCHE', categoria: 'MARCAS DE CARROS' },
	{ nome: 'TOYOTA', categoria: 'MARCAS DE CARROS' },
	// Novas marcas de carros
	{ nome: 'VOLKSWAGEN', categoria: 'MARCAS DE CARROS' },
	{ nome: 'FIAT', categoria: 'MARCAS DE CARROS' },
	{ nome: 'JEEP', categoria: 'MARCAS DE CARROS' },
	{ nome: 'KIA', categoria: 'MARCAS DE CARROS' },
	{ nome: 'NISSAN', categoria: 'MARCAS DE CARROS' },
	{ nome: 'FORD', categoria: 'MARCAS DE CARROS' },
	{ nome: 'AUDI', categoria: 'MARCAS DE CARROS' },
	{ nome: 'BMW', categoria: 'MARCAS DE CARROS' },
	{ nome: 'JAGUAR', categoria: 'MARCAS DE CARROS' },
	{ nome: 'LAND ROVER', categoria: 'MARCAS DE CARROS' },
	{ nome: 'SUBARU', categoria: 'MARCAS DE CARROS' },
	{ nome: 'MITSUBISHI', categoria: 'MARCAS DE CARROS' },
	{ nome: 'SUZUKI', categoria: 'MARCAS DE CARROS' },
	{ nome: 'CHERY', categoria: 'MARCAS DE CARROS' },
	{ nome: 'GEELY', categoria: 'MARCAS DE CARROS' },
	{ nome: 'BYD', categoria: 'MARCAS DE CARROS' },
];


// Sorteia palavra secreta
function criaPalavraSecreta() {
	const palavraAleatoria = Math.floor(Math.random() * palavras.length);
	palavraSecretaSorteada = palavras[palavraAleatoria].nome;
	palavraSecretaCategoria = palavras[palavraAleatoria].categoria;
}

criaPalavraSecreta();
aparecePalavraNaTela();


function aparecePalavraNaTela() {
	const categoria = document.getElementById('categoria');
	categoria.textContent = palavraSecretaCategoria;

	const palavraSorteada = document.getElementById('palavra-secreta');
	palavraSorteada.innerHTML = '';

	for (let i = 0; i < palavraSecretaSorteada.length; i++) {
		if (!listaDinamica[i]) {
			listaDinamica[i] = '&nbsp;';
		}
		palavraSorteada.innerHTML += `<div class='letras'>${listaDinamica[i]}</div>`;
	}
}


function verificaLetraEscolhida(letra) {
	const tecla = document.getElementById('tecla-' + letra);
	if (tecla) tecla.disabled = true;
	if (tentativas > 0) {
		mudarCorTecla('tecla-' + letra);
		comparaListas(letra);
		aparecePalavraNaTela();
	}
}


function mudarCorTecla(tecla, cor = 'green') {
	const el = document.getElementById(tecla);
	if (el) {
		el.style.background = cor;
		el.style.color = '#ffffff';
	}
}

function mudarCorTeclaErro(tecla) {
	mudarCorTecla(tecla, 'red');
}


function comparaListas(letra) {
	let acerto = false;
	for (let i = 0; i < palavraSecretaSorteada.length; i++) {
		if (palavraSecretaSorteada[i] === letra) {
			listaDinamica[i] = letra;
			acerto = true;
		}
	}

	if (acerto) {
		TocarMusicaAcerto();
	} else {
		tentativas--;
		TocarMusicaErro();
		carregaImagemForca();
	}

	if (tentativas === 0) {
		TocarMusicaFim();
		abreModal('OPS!', 'Não foi dessa vez... A palavra secreta era <br>' + palavraSecretaSorteada);
		bloquearTeclasJogo();
		return;
	}

	const vitoria = palavraSecretaSorteada.split('').every((l, i) => l === listaDinamica[i]);
	if (vitoria) {
		abreModal('PARABÉNS!', 'Você venceu!');
		TocarMusicaVitoria();
		tentativas = 0;
		bloquearTeclasJogo();
	}

// Bloqueia todas as teclas do jogo, exceto mute e reiniciar
function bloquearTeclasJogo() {
	for (let i = 65; i <= 90; i++) {
		const tecla = document.getElementById('tecla-' + String.fromCharCode(i));
		if (tecla) {
			tecla.disabled = true;
		}
	}
	// Não bloqueia o botão de reiniciar (btn-reinicia) nem o botão de mute (btn-mute)
	// Se houver outros botões, adicione exceções aqui
}
}



function carregaImagemForca() {
	const imagens = [
		'img/forca.png',      // 6 tentativas (inicial)
		'img/forca01.png',    // 5 tentativas
		'img/forca02.png',    // 4 tentativas
		'img/forca03.png',    // 3 tentativas
		'img/forca04.png',    // 2 tentativas
		'img/forca05.png',    // 1 tentativa
		'img/forca06.png',    // 0 tentativas (enforcado)
	];
	let idx = 6 - tentativas;
	if (tentativas >= 6) idx = 0;
	if (tentativas <= 0) idx = 6;
	document.getElementById('imagem').style.backgroundImage = `url('${imagens[idx]}')`;
}


function abreModal(titulo, mensagem) {
	document.getElementById('exampleModalLabel').innerText = titulo;
	document.getElementById('modal-body').innerHTML = mensagem;
	$('#myModal').modal({ show: true });

	// Reinicia o jogo ao fechar a modal (clicar em OK)
	$('#myModal').off('hidden.bs.modal').on('hidden.bs.modal', function () {
		document.getElementById('btn-reinicia').click();
	});
}



const reiniciaBotao = document.getElementById('btn-reinicia');
reiniciaBotao.addEventListener('click', () => {
	tentativas = 6;
	listaDinamica = [];
	criaPalavraSecreta();
	aparecePalavraNaTela();
	carregaImagemForca();

	// Habilitar todas as teclas
	for (let i = 65; i <= 90; i++) {
		const tecla = document.getElementById('tecla-' + String.fromCharCode(i));
		if (tecla) {
			tecla.disabled = false;
			tecla.style.background = '';
			tecla.style.color = '';
		}
	}

	// Fechar modal se estiver aberto
	if (typeof $ !== 'undefined' && $('#myModal').hasClass('show')) {
		$('#myModal').modal('hide');
	}
});
