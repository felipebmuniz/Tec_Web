class Aluno {
  constructor(nome, matricula, nota1, nota2, nota3) {
    this.matricula = matricula;
    this.nome = nome;
    this.nota1 = parseInt(nota1);
    this.nota2 = parseInt(nota2);
    this.nota3 = parseInt(nota3);
  }

  get getAluno() {
    return {
      matricula: this.matricula,
      nome: this.nome,
      nota1: this.nota1,
      nota2: this.nota2,
      nota3: this.nota3,
    };
  }

  get media() {
    return parseInt((this.nota1 + this.nota2 + this.nota3) / 3);
  }
}

function relatorioAlunos(alunos) {
  const nota = alunos.reduce((acc, aluno) =>
    acc.getAluno.nota1 > aluno.getAluno.nota1 ? acc : (acc = aluno),
  );
  console.log(`\nAluno com maior primeira nota: ${nota.getAluno.nome}\n`);

  const maiorMedia = alunos.reduce((acc, aluno) =>
    acc.media > aluno.media ? (acc = acc) : (acc = aluno),
  );
  console.log(`Aluno com maior media geral: ${maiorMedia.getAluno.nome}\n`);

  const menorMedia = alunos.reduce((acc, aluno) =>
    acc.media < aluno.media ? (acc = acc) : (acc = aluno),
  );
  console.log(`Aluno com menor media geral: ${menorMedia.getAluno.nome}\n`);

  alunos.forEach((aluno, index) =>
    console.log(
      `\nAluno ${++index} ->\n nome: ${aluno.getAluno.nome}\n media: ${
        aluno.media
      }\n situação: ${aluno.media > 6 ? 'Aprovado' : 'Reprovado'}`,
    ),
  );
}

function receberAlunos() {
  // instalar pacote para recepção de dados via terminal npm install readline-sync
  var readlineSync = require('readline-sync');
  var nome, matricula, nota1, nota2, nota3;
  const alunos = [];

  for (let index = 0; index < 5; index++) {
    matricula = readlineSync.question(
      `\nDigite o matricula do aluno ${index}: `,
    );
    nome = readlineSync.question(`\nDigite o nome do aluno ${index}: `);
    nota1 = readlineSync.question(`Digite a primeira nota do aluno ${index}: `);
    nota2 = readlineSync.question(`Digite a segunda nota do aluno ${index}: `);
    nota3 = readlineSync.question(`Digite a terceira nota do aluno ${index}: `);

    alunos[index] = new Aluno(nome, matricula, nota1, nota2, nota3);
  }
  return alunos;
}

relatorioAlunos(receberAlunos());

process.exit();
