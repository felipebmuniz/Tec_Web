function novoElemento(tagName, className) {
  const elemento = document.createElement(tagName);
  elemento.className = className;
  return elemento;
}

function Barreira(reversa = false) {
  this.elemento = novoElemento('div', 'barreira');
  const borda = novoElemento('div', 'borda');
  const corpo = novoElemento('div', 'corpo');
  this.elemento.appendChild(reversa ? corpo : borda);
  this.elemento.appendChild(reversa ? borda : corpo);

  this.setAltura = (altura) => (corpo.style.height = `${altura}px`);
}

function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
  this.elemento = novoElemento('div', 'par-de-barreiras');
  this.superior = new Barreira(true);
  this.inferior = new Barreira(false);

  this.elemento.appendChild(this.superior.elemento);
  this.elemento.appendChild(this.inferior.elemento);

  this.sortearAbertura = () => {
    const alturaSuperior = Math.random() * (altura - abertura);
    const alturaInferior = altura - abertura - alturaSuperior;
    this.superior.setAltura(alturaSuperior);
    this.inferior.setAltura(alturaInferior);
  };
  this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
  this.setX = (popsicaoNaTela) =>
    (this.elemento.style.left = `${popsicaoNaTela}px`);
  this.getLargura = () => this.elemento.clientWidth;

  this.sortearAbertura();
  this.setX(popsicaoNaTela);
}

function Barreiras(
  altura,
  largura,
  abertura,
  espaco,
  notificarPonto,
  velocidade,
) {
  this.pares = [
    new ParDeBarreiras(altura, abertura, largura),
    new ParDeBarreiras(altura, abertura, largura + espaco),
    new ParDeBarreiras(altura, abertura, largura + espaco * 2),
    new ParDeBarreiras(altura, abertura, largura + espaco * 3),
  ];

  const deslocamento = velocidade;
  this.animar = () => {
    this.pares.forEach((par) => {
      par.setX(par.getX() - deslocamento);

      if (par.getX() < -par.getLargura()) {
        par.setX(par.getX() + espaco * this.pares.length);
        par.sortearAbertura();
      }
      const meio = largura / 2;
      const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio;
      if (cruzouMeio) {
        notificarPonto();
      }
    });
  };
}

function Passaro(alturaJogo, personagem, velocidade) {
  let voando = false;
  this.elemento = novoElemento('img', 'passaro');
  this.elemento.src = `./img/${personagem}.png`;

  this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0]);
  this.setY = (y) => (this.elemento.style.bottom = `${y}px`);

  window.onkeydown = (e) => (voando = true);
  window.onkeyup = (e) => (voando = false);

  this.animar = () => {
    const novoY =
      this.getY() + (voando ? velocidade.subida : velocidade.descida);
    const alturaMaxima = alturaJogo - this.elemento.clientWidth;

    if (novoY <= 0) {
      this.setY(0);
    } else if (novoY >= alturaMaxima) {
      this.setY(alturaMaxima);
    } else {
      this.setY(novoY);
    }
  };
  this.setY(alturaJogo / 2);
}

function Progresso() {
  this.elemento = novoElemento('span', 'progresso');
  this.atualizarPontos = (pontos) => {
    this.elemento.innerHTML = pontos;
  };
  this.atualizarPontos(0);
}

function estaoSobrepostos(elementoA, elementoB) {
  const a = elementoA.getBoundingClientRect();
  const b = elementoB.getBoundingClientRect();
  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

  return horizontal && vertical;
}

function colidiu(passaro, barreiras) {
  let colidiu = false;

  barreiras.pares.forEach((parDeBarreiras) => {
    if (!colidiu) {
      const superior = parDeBarreiras.superior.elemento;
      const inferior = parDeBarreiras.inferior.elemento;
      colidiu =
        estaoSobrepostos(passaro.elemento, superior) ||
        estaoSobrepostos(passaro.elemento, inferior);
    }
  });
  return colidiu;
}

function getValoresLocal() {
  const valores = {
    jogador: localStorage.nome ? localStorage.nome : 'User',
    cenario: localStorage.cenario ? localStorage.cenario : 'diurno',
    intervalo: localStorage.intervalo ? localStorage.intervalo : 'medio',
    distancia: localStorage.distancia ? localStorage.distancia : 'facil',
    velocidade: parseInt(
      localStorage.velocidade > 0 && localStorage.velocidade < 11
        ? localStorage.velocidade
        : '3',
    ),
    personagem: localStorage.personagem ? localStorage.personagem : 'bird',
    tipo: localStorage.tipo ? localStorage.tipo : 'real',
    vel_personagem: localStorage.vel_personagem
      ? localStorage.vel_personagem
      : 'baixa',
    pontuacao: parseInt(localStorage.pontuacao ? localStorage.pontuacao : '10'),
  };
  return valores;
}

function setCenario(cenario) {
  switch (cenario) {
    case 'diurno':
      document.querySelector('[wm-flappy]').classList.add(cenario);
      break;
    case 'noturno':
      document.querySelector('[wm-flappy]').classList.add(cenario);
      break;
    default:
      document.querySelector('[wm-flappy]').classList.add('diurno');
      break;
  }
}

function setAbertura(abertura) {
  switch (abertura) {
    case 'facil':
      return 300;
    case 'medio':
      return 220;
    case 'dificil':
      return 150;
    default:
      return 200;
  }
}

function setIntervalo(intervalo) {
  switch (intervalo) {
    case 'facil':
      return 520;
    case 'medio':
      return 400;
    case 'dificil':
      return 330;
    default:
      return 400;
  }
}

function setPersonagem(personagem) {
  switch (personagem) {
    case 'bird':
      return personagem;
    case 'articuno':
      return personagem;
    case 'charizard':
      return personagem;
    default:
      return 'bird';
  }
}

function setTipo(tipo) {
  switch (tipo) {
    case 'treino':
      return tipo;
    case 'real':
      return tipo;
    default:
      return 'real';
  }
}

function setVelPersonagem(velocidade) {
  switch (velocidade) {
    case 'baixa':
      return {
        subida: 5,
        descida: -2,
      };
    case 'media':
      return {
        subida: 8,
        descida: -5,
      };
    case 'rapida':
      return {
        subida: 11,
        descida: -8,
      };
    default:
      return {
        subida: 8,
        descida: -5,
      };
  }
}

function setPontuacao(pontuacao) {
  switch (pontuacao) {
    case 1:
      return pontuacao;
    case 10:
      return pontuacao;
    case 100:
      return pontuacao;
    default:
      return 1;
  }
}

function placar(jogador) {
  const pontuacao = document.querySelector('.progresso').textContent;
  console.log(jogador, pontuacao);
  const navegar = confirm(
    `\nJogador: ${jogador}\nPlacar: ${pontuacao} \n\nPara tentar novamente click em 'OK'`,
  );

  if (navegar == true) {
    window.location.href = './flappy.html';
  } else {
    localStorage.clear();
    window.location.href = './form.html';
  }
}

function sairTreino() {
  link = novoElemento('a', 'link');
  bnt = novoElemento('div', 'botao');
  elemento = document.querySelector('body');
  elemento.appendChild(link);
  link.appendChild(bnt);

  link.href = './form.html';
  bnt.appendChild(document.createTextNode('Sair do Treino'));
}

function FlappyBird() {
  let pontos = 0;
  const areaDoJogo = document.querySelector('[wm-flappy]');
  const altura = areaDoJogo.clientHeight;
  const largura = areaDoJogo.clientWidth;

  const valores = getValoresLocal();
  setCenario(valores.cenario);

  if (setTipo(valores.tipo) == 'treino') {
    sairTreino();
  }

  const progresso = new Progresso();
  const barreiras = new Barreiras(
    altura,
    largura,
    setAbertura(valores.intervalo),
    setIntervalo(valores.distancia),
    () =>
      progresso.atualizarPontos(
        (pontos = pontos + setPontuacao(valores.pontuacao)),
      ),
    valores.velocidade,
  );

  const passaro = new Passaro(
    altura,
    setPersonagem(valores.personagem),
    setVelPersonagem(valores.vel_personagem),
  );

  areaDoJogo.appendChild(progresso.elemento);
  areaDoJogo.appendChild(passaro.elemento);
  barreiras.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

  this.start = () => {
    const temporizador = setInterval(() => {
      barreiras.animar();
      passaro.animar();

      if (setTipo(valores.tipo) == 'real') {
        if (colidiu(passaro, barreiras)) {
          clearInterval(temporizador);
          placar(valores.jogador);
        }
      }
    }, 20);
  };
}

new FlappyBird().start();
