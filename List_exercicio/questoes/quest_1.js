class Aluno {
  constructor(nome, matricula, curso) {
    this._nome = nome;
    this._matricula = matricula;
    this._curso = curso;
  }

  get getAluno() {
    return {
      nome: this._nome,
      matricula: this._matricula,
      curso: this._curso,
    };
  }
}

function mostrarAlunos(alunos) {
  alunos.forEach((aluno, index) =>
    console.log(
      `\nAluno ${++index} ->\n nome: ${aluno.getAluno.nome}\n matricula: ${
        aluno.getAluno.matricula
      }\n curso: ${aluno.getAluno.curso}`,
    ),
  );
}

function receberAlunos() {
  // instalar pacote para recepção de dados via terminal npm install readline-sync
  var readlineSync = require('readline-sync');
  var nome, matricula, curso;
  const alunos = [];

  for (let index = 0; index < 5; index++) {
    nome = readlineSync.question(`\nDigite o nome do aluno ${index}: `);
    matricula = readlineSync.question(`Digite o matricula do aluno ${index}: `);
    curso = readlineSync.question(`Digite o curso do aluno ${index}: `);
    alunos[index] = new Aluno(nome, matricula, curso);
  }
  return alunos;
}

mostrarAlunos(receberAlunos());
