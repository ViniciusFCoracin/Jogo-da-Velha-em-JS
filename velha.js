/*
 * O código seguinte programa um jogo da velha em JavaScript.
 * O elemento <canvas> foi utilizado para desenhar o tabuleiro do jogo, bem como para 
 * desenhar as "bolinhas" e os "X".
 */

let jog1; let jog2; //Váriaveis que armazenam os nomes dos jogadores

let pontos1 = 0; let pontos2 = 0; //Armazenam a quantidade de pontos de cada jogador

let turnoInicial = 2; /*Guarda a informação de qual jogador foi o primeiro a jogar em cada rodada
(1 ou 2). Por padrão, na primeira rodada quem começa jogando é o jogador 1. Na segunda, quem
começa é o jogador 2. Na terceira, é novamente o 1, e assim por diante. */

let turno; //Variável que determina a vez de cada um jogar, dentro de uma mesma rodada.

/*Variáveis que informam se cada uma das 9 casas do tabuleiro está preenchida por uma bola,
por um x ou se não está ocupada ainda. */
let pos1; let pos2; let pos3;
let pos4; let pos5; let pos6;
let pos7; let pos8; let pos9;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.getBoundingClientRect().width; //Largura do <canvas>
const height = canvas.getBoundingClientRect().height; //Altura do <canvas>

function inicia() {
	/* O nome dos jogadores é pedido através de um prompt. Se a resposta do prompt
	for "cancela" ou se for enviado em branco, então um nome padrão é utilizado. */
	jog1 = window.prompt("Digite o nome do primeiro jogador (X)");
	jog2 = window.prompt("Digite o nome do segundo jogador (O)")
	if (jog1 === null || jog1 === "" || jog1.trim() === "") {
		jog1 = "Jogador 1";
	}
	if (jog2 === null || jog2 === "" || jog2.trim() === "") {
		jog2 = "Jogador 2";
	}
	reinicia();
}

function reinicia() {
	/* Essa função desenha um novo tabuleiro, atualiza a contagem de pontos e passa o turno 
	para o próximo jogador */
	pos1 = pos2 = pos3 = pos4 = pos5 = pos6 = pos7 = pos8 = pos9 = 0;
	document.getElementById("pontos1").textContent = `${jog1}: ${pontos1}`;
	document.getElementById("pontos2").textContent = `${jog2}: ${pontos2}`;

	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(width / 3, 0);
	ctx.lineTo(width / 3, height);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, height / 3);
	ctx.lineTo(width, height / 3);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(2 * width / 3, 0);
	ctx.lineTo(2 * width / 3, height);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, 2 * height / 3);
	ctx.lineTo(width, 2 * height / 3);
	ctx.stroke();

	if (turnoInicial === 1) {
		turnoInicial = 2;
		turno = turnoInicial;
	}
	else if (turnoInicial === 2) {
		turnoInicial = 1;
		turno = turnoInicial;
	}
}

function jogar(event) {
	/* Captura a coordenada do <canvas> em que foi clicado */
	const posX = event.pageX - canvas.offsetLeft;
	const posY = event.pageY - canvas.offsetTop;

// E com base nela, invoca uma função que desenha um X ou uma bolinha.
	if (posX < width / 3 && posY < height / 3) {
		if (turno === 1) desenhaX(1);
		else desenhaO(1);
	}
	else if (width / 3 < posX && posX < 2 * width / 3 && posY < height / 3) {
		if (turno === 1) desenhaX(2);
		else desenhaO(2);
	}
	else if (2 * width / 3 < posX && posX < width && posY < height / 3) {
		if (turno === 1 ) desenhaX(3);
		else desenhaO(3);
	}
	else if (posX < width / 3 && height / 3 < posY && posY < 2 * height / 3) {
		if (turno === 1 ) desenhaX(4);
		else desenhaO(4);
	}
	else if (width / 3 < posX && posX < 2 * width / 3 && height / 3 < posY && posY < 2 * height / 3) {
		if (turno === 1 ) desenhaX(5);
		else desenhaO(5);
	}
	else if (2 * width / 3 < posX && posX < width && height / 3 < posY && posY < 2 * height / 3) {
		if (turno === 1 ) desenhaX(6);
		else desenhaO(6);
	}
	else if (posX < width / 3 && 2 * height / 3 < posY && posY < height) {
		if (turno === 1 ) desenhaX(7);
		else desenhaO(7);
	}
	else if (width / 3 < posX && posX < 2 * width / 3 && 2 * height / 3 < posY && posY < height) {
		if (turno === 1 ) desenhaX(8);
		else desenhaO(8);
	}
	else if (2 * width / 3 < posX && posX < width && 2 * height / 3 < posY && posY < height) {
		if (turno === 1 ) desenhaX(9);
		else desenhaO(9);
	}
}

function desenhaX(n) {
	if ((n === 1 && pos1 !== 0) ||
		(n === 2 && pos2 !== 0) ||
		(n === 3 && pos3 !== 0) ||
		(n === 4 && pos4 !== 0) ||
		(n === 5 && pos5 !== 0) ||
		(n === 6 && pos6 !== 0) ||
		(n === 7 && pos7 !== 0) ||
		(n === 8 && pos8 !== 0) ||
		(n === 9 && pos9 !== 0)) {
		document.getElementById("aviso").textContent = "Posição já ocupada! Faça outra jogada!"
	}
	else {
		// Desenha um X na posição especificada 
		switch (n) {
			case 1:
				ctx.beginPath();
				ctx.moveTo(width / 12, height / 12);
				ctx.lineTo(width / 4, height / 4);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(width / 4, height / 12);
				ctx.lineTo(width / 12, height / 4);
				ctx.stroke();
				pos1 = 1;
				break;
			case 2:
				ctx.beginPath();
				ctx.moveTo(5 * width / 12, height / 12);
				ctx.lineTo(7 * width / 12, height / 4);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(7 * width / 12, height / 12);
				ctx.lineTo(5 * width / 12, height / 4);
				ctx.stroke();
				pos2 = 1;
				break;
			case 3:
				ctx.beginPath();
				ctx.moveTo(9 * width / 12, height / 12)
				ctx.lineTo(11 * width / 12, height / 4);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(11 * width / 12, height / 12);
				ctx.lineTo(9 * width / 12, height / 4),
				ctx.stroke();
				pos3 = 1;
				break;
			case 4:
				ctx.beginPath();
				ctx.moveTo(width / 12, 5 * height / 12);
				ctx.lineTo(width / 4, 7 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(width / 4, 5 * height / 12);
				ctx.lineTo(width / 12, 7 * height / 12);
				ctx.stroke();
				pos4 = 1;
				break;
			case 5:
				ctx.beginPath();
				ctx.moveTo(5 * width / 12, 5 * height / 12);
				ctx.lineTo(7 * width / 12, 7 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(7 * width / 12, 5 * height / 12);
				ctx.lineTo(5 * width / 12, 7 * height / 12);
				ctx.stroke();
				pos5 = 1;
				break;
			case 6:
				ctx.beginPath();
				ctx.moveTo(9 * width / 12, 5 * height / 12);
				ctx.lineTo(11 * width / 12, 7 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(11 * width / 12, 5 * height / 12);
				ctx.lineTo(9 * width / 12, 7 * height / 12);
				ctx.stroke();
				pos6 = 1;
				break;
			case 7:
				ctx.beginPath();
				ctx.moveTo(width / 12, 9 * height / 12);
				ctx.lineTo(3 * width / 12, 11 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(3 * width / 12, 9 * height / 12);
				ctx.lineTo(width / 12, 11 * height / 12);
				ctx.stroke();
				pos7 = 1;
				break;
			case 8:
				ctx.beginPath();
				ctx.moveTo(5 * width / 12, 9 * height / 12);
				ctx.lineTo(7 * width / 12, 11 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(7 * width / 12, 9 * height / 12);
				ctx.lineTo(5 * width / 12, 11 * height / 12);
				ctx.stroke();
				pos8 = 1;
				break;
			case 9:
				ctx.beginPath();
				ctx.moveTo(9 * width / 12, 9 * height / 12);
				ctx.lineTo(11 * width / 12, 11 * height / 12);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(11 * width / 12, 9 * height / 12);
				ctx.lineTo(9 * width / 12, 11 * height / 12);
				ctx.stroke();
				pos9 = 1;
				break;
		}
		// Passa o turno para o outro jogador e testa se houve fim de jogo.
		turno = 2;
		testar();
	}
}

function desenhaO(n) {
	if ((n === 1 && pos1 !== 0) ||
		(n === 2 && pos2 !== 0) ||
		(n === 3 && pos3 !== 0) ||
		(n === 4 && pos4 !== 0) ||
		(n === 5 && pos5 !== 0) ||
		(n === 6 && pos6 !== 0) ||
		(n === 7 && pos7 !== 0) ||
		(n === 8 && pos8 !== 0) ||
		(n === 9 && pos9 !== 0)) {
		document.getElementById("aviso").textContent = "Posição já ocupada! Faça outra jogada!"
	}
	else {
		// Desenha uma bolinha na posição especificada 
		switch (n) {
			case 1:
				ctx.beginPath();
				ctx.arc(width / 6, height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos1 = 2;
				break;
			case 2:
				ctx.beginPath();
				ctx.arc(width / 2, height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos2 = 2;
				break;
			case 3:
				ctx.beginPath();
				ctx.arc(5 * width / 6, height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos3 = 2;
				break;
			case 4:
				ctx.beginPath();
				ctx.arc(width / 6, height / 2, width / 15, 0, 360);
				ctx.stroke();
				pos4 = 2;
				break;
			case 5:
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, width / 15, 0, 360);
				ctx.stroke();
				pos5 = 2;
				break;
			case 6:
				ctx.beginPath();
				ctx.arc(5 * width / 6, height / 2, width / 15, 0, 360);
				ctx.stroke();
				pos6 = 2;
				break;
			case 7:
				ctx.beginPath();
				ctx.arc(width / 6, 5 * height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos7 = 2;
				break;
			case 8:
				ctx.beginPath();
				ctx.arc(width / 2, 5 * height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos8 = 2;
				break;
			case 9:
				ctx.beginPath();
				ctx.arc(5 * width / 6, 5 * height / 6, width / 15, 0, 360);
				ctx.stroke();
				pos9 = 2;
				break;
		}
		// Passa o turno para o outro jogador e testa se houve fim de jogo.
		turno = 1;
		testar();
	}
}

function testar() {
	if ((pos1 === pos2 && pos2 === pos3 && pos1 === 1) ||
		(pos4 === pos5 && pos5 === pos6 && pos4 === 1) ||
		(pos7 === pos8 && pos8 === pos9 && pos7 === 1) ||
		(pos1 === pos4 && pos4 === pos7 && pos1 === 1) ||
		(pos2 === pos5 && pos5 === pos8 && pos2 === 1) ||
		(pos3 === pos6 && pos6 === pos9 && pos3 === 1) ||
		(pos1 === pos5 && pos5 === pos9 && pos1 === 1) ||
		(pos3 === pos5 && pos5 === pos7 && pos3 === 1)) {
			pontos1++
			let res = window.confirm(`Parabéns, ${jog1}, você venceu esta rodada! Deseja jogar novamente?`)
			if (res) {
				reinicia();
			}
			else if (!res) {
				encerra();
			}
	}
	else if ((pos1 === pos2 && pos2 === pos3 && pos1 === 2) ||
		 	 (pos4 === pos5 && pos5 === pos6 && pos4 === 2) ||
			 (pos7 === pos8 && pos8 === pos9 && pos7 === 2) ||
			 (pos1 === pos4 && pos4 === pos7 && pos1 === 2) ||
			 (pos2 === pos5 && pos5 === pos8 && pos2 === 2) ||
			 (pos3 === pos6 && pos6 === pos9 && pos3 === 2) ||
			 (pos1 === pos5 && pos5 === pos9 && pos1 === 2) ||
			 (pos3 === pos5 && pos5 === pos7 && pos3 === 2)) {
				pontos2++;
				let res = window.confirm(`Parabéns, ${jog2}, você venceu esta rodada! Deseja jogar novamente?`);
				if (res) {
					reinicia();
				}
				else if (!res) {
					encerra();
		}
	}
	else if (pos1 !== 0 && pos2 !== 0 && pos3 !== 0 &&
			 pos4 !== 0 && pos5 !== 0 && pos6 !== 0 &&
			 pos7 !== 0 && pos8 !== 0 && pos9 !== 0){
				let res = window.confirm("Essa rodada deu velha! Desejam jogar novamente?");
				if (res) {
					reinicia();
				}
				else if (!res) {
					encerra();
				}
	}
}

function encerra() {
	if (pontos1 > pontos2) {
		document.getElementById("aviso").textContent = `${jog1} venceu! Placar final:\n ${jog1}: ${pontos1} VS ${pontos2} :${jog2}`
	}
	else if (pontos1 < pontos2) {
		document.getElementById("aviso").textContent = `${jog2} venceu! Placar final:\n ${jog1}: ${pontos1} VS ${pontos2} :${jog2}`
	}
	else if (pontos1 === pontos2) {
		document.getElementById("aviso").textContent = `Empate! Placar final:\n ${jog1}: ${pontos1} VS ${pontos2} :${jog2}`
	}
	document.getElementById("pontos1").textContent = `${jog1}: ${pontos1}`;
	document.getElementById("pontos2").textContent = `${jog2}: ${pontos2}`;
	document.getElementById("canvas").removeEventListener("click", jogar);
}

window.addEventListener("load", inicia);
canvas.addEventListener("click", jogar);