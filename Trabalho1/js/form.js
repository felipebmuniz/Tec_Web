class Elemento_Radio {
  constructor(radio_name) {
    this.options = document.querySelectorAll(`input[name='${radio_name}']`);
    this.name = radio_name;
    this.value = 0;
  }
}

class Elemento_Input {
  constructor(input_name) {
    this.input = document.querySelector(`input[id='${input_name}']`);
    this.name = input_name;
  }
}

function armazenaValor(nome, valor) {
  localStorage.setItem(nome, valor);
  console.log(valor);
}

function verificaRadio(elemento) {
  for (var aux = 0; aux < elemento.options.length; aux++) {
    elemento.options[aux].onclick = function () {
      elemento.value = this.value;
    };
  }
}

const jogador = new Elemento_Input('nome');
const cenario = new Elemento_Radio('cenario');
const intervalo = new Elemento_Radio('intervalo');
const distancia = new Elemento_Radio('distancia');
const velocidade = new Elemento_Input('velocidade');
const personagem = new Elemento_Radio('personagem');
const tipo = new Elemento_Radio('tipo');
const vel_personagem = new Elemento_Radio('vel_personagem');
const pontuacao = new Elemento_Radio('pontuacao');

verificaRadio(cenario);
verificaRadio(intervalo);
verificaRadio(distancia);
verificaRadio(personagem);
verificaRadio(tipo);
verificaRadio(vel_personagem);
verificaRadio(pontuacao);

const form = document.querySelector('#formulario');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  armazenaValor(jogador.name, jogador.input.value);
  armazenaValor(cenario.name, cenario.value);
  armazenaValor(intervalo.name, intervalo.value);
  armazenaValor(distancia.name, distancia.value);
  armazenaValor(velocidade.name, velocidade.input.value);
  armazenaValor(personagem.name, personagem.value);
  armazenaValor(tipo.name, tipo.value);
  armazenaValor(vel_personagem.name, vel_personagem.value);
  armazenaValor(pontuacao.name, pontuacao.value);
  window.location.href = './flappy.html';
});
