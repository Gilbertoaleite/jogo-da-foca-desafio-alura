/** @format */

// função imagem inicial
function showMe() {
	var escondeJogo = document.getElementById('hidden');

	if (escondeJogo.style.display == '' || escondeJogo.style.display == 'none') {
		escondeJogo.style.display = 'block';
	} else {
		escondeJogo.style.display = 'none';
	}
}
// -----------------funções Sonss--------------------------

function TocarMusicaInicio() {
	var audio1 = new Audio();
	audio1.src = 'sons/mario_inicio.mp3';
	audio1.play();
	audio1.loop = false;
}

function TocarMusicaFim() {
	var audio1 = new Audio();
	audio1.src = 'sons/faustao_errou.mp3';
	audio1.play();
	audio1.loop = false;
}

function TocarMusicaAcerto() {
	var audio1 = new Audio();
	audio1.src = 'sons/som_acerto.mp3';
	audio1.play();
	audio1.loop = false;
}

function TocarMusicaErro() {
	var audio1 = new Audio();
	audio1.src = 'sons/zapsplat_erro_tentativa.mp3';
	audio1.play();
	audio1.loop = false;
}

function TocarMusicaVitoria() {
	var audio1 = new Audio();
	audio1.src = 'sons/vitoria_sf.mp3';
	audio1.play();
	audio1.loop = false;
}

//------------fim funções sons-----------------

//----------- função iniciar jogo ------------------

let iniciaBotao = document.querySelector('#btn-cripto');
iniciaBotao.addEventListener('click', function (event) {
	event.preventDefault();

	var tocaMusicaInicio = TocarMusicaInicio();

	var escondeImagem = document.querySelector('.img-gif');

	escondeImagem.classList.add('fadeOut');

	setTimeout(function () {
		escondeImagem.remove();
	}, 1000);

	iniciaBotao.classList.add('fadeOut');

	setTimeout(function () {
		let iniciaJogo = showMe();
	}, 1000);
});

let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;

// lista palavra Secreta Sorteada

const palavras = [
	(palavra001 = {
		nome: 'ESPANHA',
		categoria: 'PAÍSES',
	}),
	(palavra002 = {
		nome: 'ALEMANHA',
		categoria: 'PAÍSES',
	}),
	(palavra003 = {
		nome: 'TAILANDIA',
		categoria: 'PAÍSES',
	}),
	(palavra004 = {
		nome: 'PAQUISTAO',
		categoria: 'PAÍSES',
	}),
	(palavra005 = {
		nome: 'ISLANDIA',
		categoria: 'PAÍSES',
	}),
	(palavra006 = {
		nome: 'CHILE',
		categoria: 'PAÍSES',
	}),
	(palavra007 = {
		nome: 'CANADA',
		categoria: 'PAÍSES',
	}),
	(palavra008 = {
		nome: 'MARROCOS',
		categoria: 'PAÍSES',
	}),
	(palavra009 = {
		nome: 'BOTSWANA',
		categoria: 'PAÍSES',
	}),
	(palavra010 = {
		nome: 'MALASIA',
		categoria: 'PAÍSES',
	}),
	(palavra011 = {
		nome: 'MACARRAO',
		categoria: 'COMIDAS',
	}),
	(palavra012 = {
		nome: 'FEIJOADA',
		categoria: 'COMIDAS',
	}),
	(palavra013 = {
		nome: 'VATAPA',
		categoria: 'COMIDAS',
	}),
	(palavra014 = {
		nome: 'SUSHI',
		categoria: 'COMIDAS',
	}),
	(palavra015 = {
		nome: 'CHURRASCO',
		categoria: 'COMIDAS',
	}),
	(palavra016 = {
		nome: 'PAELLA',
		categoria: 'COMIDAS',
	}),
	(palavra017 = {
		nome: 'MIOJO',
		categoria: 'COMIDAS',
	}),
	(palavra018 = {
		nome: 'CAMARAO',
		categoria: 'COMIDAS',
	}),
	(palavra019 = {
		nome: 'SORVETE',
		categoria: 'COMIDAS',
	}),
	(palavra020 = {
		nome: 'HAMBURGER',
		categoria: 'COMIDAS',
	}),
	(palavra021 = {
		nome: 'CACHORRO',
		categoria: 'ANIMAIS',
	}),
	(palavra022 = {
		nome: 'LONTRA',
		categoria: 'ANIMAIS',
	}),
	(palavra023 = {
		nome: 'PINGUIM',
		categoria: 'ANIMAIS',
	}),
	(palavra024 = {
		nome: 'ZEBRA',
		categoria: 'ANIMAIS',
	}),
	(palavra025 = {
		nome: 'TAMANDUA',
		categoria: 'ANIMAIS',
	}),
	(palavra026 = {
		nome: 'ALPACA',
		categoria: 'ANIMAIS',
	}),
	(palavra027 = {
		nome: 'BAIACU',
		categoria: 'ANIMAIS',
	}),
	(palavra028 = {
		nome: 'BORBOLETA',
		categoria: 'ANIMAIS',
	}),
	(palavra029 = {
		nome: 'CARANGUEJO',
		categoria: 'ANIMAIS',
	}),
	(palavra030 = {
		nome: 'ORANGOTANGO',
		categoria: 'ANIMAIS',
	}),
	(palavra031 = {
		nome: 'PRATOS',
		categoria: 'ITENS DE CASA',
	}),
	(palavra032 = {
		nome: 'ESPELHO',
		categoria: 'ITENS DE CASA',
	}),
	(palavra033 = {
		nome: 'CADEIRA',
		categoria: 'ITENS DE CASA',
	}),
	(palavra034 = {
		nome: 'ESTANTE',
		categoria: 'ITENS DE CASA',
	}),
	(palavra035 = {
		nome: 'GELADEIRA',
		categoria: 'ITENS DE CASA',
	}),
	(palavra036 = {
		nome: 'MAQUINA DE LAVAR',
		categoria: 'ITENS DE CASA',
	}),
	(palavra037 = {
		nome: 'MICROONDAS',
		categoria: 'ITENS DE CASA',
	}),
	(palavra038 = {
		nome: 'ARMARIO',
		categoria: 'ITENS DE CASA',
	}),
	(palavra039 = {
		nome: 'PANELA',
		categoria: 'ITENS DE CASA',
	}),
	(palavra040 = {
		nome: 'CHUVEIRO',
		categoria: 'ITENS DE CASA',
	}),
	(palavra041 = {
		nome: 'WOLFSBURG',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra042 = {
		nome: 'NOVORIZONTINO',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra043 = {
		nome: 'LEVANTE',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra044 = {
		nome: 'ATALANTA',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra045 = {
		nome: 'FEYENOORD',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra046 = {
		nome: 'BENFICA',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra047 = {
		nome: 'EVERTON',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra048 = {
		nome: 'JUVENTUS',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra049 = {
		nome: 'PORTUGUESA',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra050 = {
		nome: 'FLAMENGO',
		categoria: 'TIMES DE FUTEBOL',
	}),
	(palavra051 = {
		nome: 'FERRARI',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra052 = {
		nome: 'HYUNDAI',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra053 = {
		nome: 'HONDA',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra054 = {
		nome: 'MERCEDES',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra055 = {
		nome: 'RENAULT',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra056 = {
		nome: 'CHEVROLET',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra057 = {
		nome: 'CITROEN',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra058 = {
		nome: 'PEUGEOT',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra059 = {
		nome: 'PORSCHE',
		categoria: 'MARCAS DE CARROS',
	}),
	(palavra060 = {
		nome: 'TOYOTA',
		categoria: 'MARCAS DE CARROS',
	}),
];

// função sorteia palavara secreta
criaPalavraSecreta();
function criaPalavraSecreta() {
	const palavraAleatoria = parseInt(Math.random() * palavras.length);

	palavraSecretaSorteada = palavras[palavraAleatoria].nome;
	palavraSecretaCategoria = palavras[palavraAleatoria].categoria;
}
aparecePalavraNaTela();

function aparecePalavraNaTela() {
	const categoria = document.getElementById('categoria');
	categoria.innerHTML = palavraSecretaCategoria;

	const palavraSorteada = document.getElementById('palavra-secreta');
	palavraSorteada.innerHTML = '';

	for (i = 0; i < palavraSecretaSorteada.length; i++) {
		if (listaDinamica[i] == undefined) {
			listaDinamica[i] = '&nbsp;';
			palavraSorteada.innerHTML =
				palavraSorteada.innerHTML +
				"<div class = 'letras'>" +
				listaDinamica[i] +
				'</div>';
		} else {
			palavraSorteada.innerHTML =
				palavraSorteada.innerHTML +
				"<div class = 'letras'>" +
				listaDinamica[i] +
				'</div>';
		}
	}
}

function verificaLetraEscolhida(letra) {
	document.getElementById('tecla-' + letra).disabled = true;

	if (tentativas > 0) {
		mudarCorTecla('tecla-' + letra);
		comparaListas(letra);
		aparecePalavraNaTela();
	}
	if (tentativas < 0) {
		mudarCorTeclaErro('tecla-' + letra);
	}
}

function mudarCorTecla(tecla) {
	document.getElementById(tecla).style.background = 'green';
	document.getElementById(tecla).style.color = '#ffffff';
}

function comparaListas(letra) {
	const pos = palavraSecretaSorteada.indexOf(letra);

	if (pos > 0) {
		TocarMusicaAcerto();
	}

	if (pos < 0) {
		tentativas--;
		TocarMusicaErro();
		carregaImagemForca();
	}

	if (tentativas == 0) {
		TocarMusicaFim();
		abreModal(
			'OPS!',
			'Não foi dessa vez... A palavra secreta era <br>' +
				palavraSecretaSorteada,
		);
	} else {
		for (i = 0; i < palavraSecretaSorteada.length; i++) {
			if (palavraSecretaSorteada[i] == letra) {
				listaDinamica[i] = letra;
			}
		}
	}

	let vitoria = true;
	for (i = 0; i < palavraSecretaSorteada.length; i++) {
		if (palavraSecretaSorteada[i] != listaDinamica[i]) {
			vitoria = false;
		}
	}

	if (vitoria == true) {
		abreModal('PARABÉNS!', 'Você venceu!');
		TocarMusicaVitoria();
		tentativas = 0;
	}
}

function carregaImagemForca() {
	switch (tentativas) {
		case 5:
			document.getElementById('imagem').style.background =
				"url('img/forca01.png')";
			break;

		case 4:
			document.getElementById('imagem').style.background =
				"url('img/forca02.png')";
			break;

		case 3:
			document.getElementById('imagem').style.background =
				"url('img/forca03.png')";
			break;

		case 2:
			document.getElementById('imagem').style.background =
				"url('img/forca04.png')";
			break;

		case 1:
			document.getElementById('imagem').style.background =
				"url('img/forca05.png')";
			break;

		case 0:
			document.getElementById('imagem').style.background =
				"url('img/forca06.png')";
			break;
		default:
			document.getElementById('imagem').style.background =
				"url('img/forca.png')";
			break;
	}
}

function abreModal(titulo, mensagem) {
	let modalTitulo = document.getElementById('exampleModalLabel');
	modalTitulo.innerText = titulo;

	let modalCorpo = document.getElementById('modal-body');
	modalCorpo.innerHTML = mensagem;

	$('#myModal').modal({
		show: true,
	});
}

let reiniciaBotao = document.getElementById('btn-reinicia');
reiniciaBotao.addEventListener('click', function () {
	location.reload();
});
