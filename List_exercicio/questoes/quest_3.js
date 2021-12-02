class Aluno {
  constructor(nome, matricula, media) {
    this.matricula = matricula;
    this.nome = nome;
    this.media = parseFloat(media);
  }

  get getAluno() {
    return {
      matricula: this.matricula,
      nome: this.nome,
      media: this.media,
    };
  }
}

function relatorioAlunos(alunos) {
  console.log(alunos);

  const aprovados = alunos.filter((aluno) => aluno.getAluno.media > 5.0);

  if (aprovados) {
    aprovados.forEach((aluno) => {
      console.log(
        `\nAprovados-> \n nome: ${aluno.getAluno.nome}\n matricula: ${aluno.getAluno.matricula}\n media: ${aluno.getAluno.media}`,
      );
    });
  } else {
    console.log('\nSem alunos Aprovados.');
  }

  const reprovados = alunos.filter((aluno) => aluno.getAluno.media < 5.0);

  if (reprovados) {
    reprovados.forEach((aluno) => {
      console.log(
        `\nReprovado-> \n nome: ${aluno.getAluno.nome}\n matricula: ${aluno.getAluno.matricula}\n media: ${aluno.getAluno.media}`,
      );
    });
  } else {
    console.log('\nSem alunos Reprovados.');
  }
}

function receberAlunos() {
  // instalar pacote para recepção de dados via terminal npm install readline-sync
  var readlineSync = require('readline-sync');
  var nome, matricula, media;
  const alunos = [];

  for (let index = 0; index < 10; index++) {
    matricula = readlineSync.question(
      `\nDigite o matricula do aluno ${index}: `,
    );
    nome = readlineSync.question(`Digite o nome do aluno ${index}: `);
    media = readlineSync.question(`Digite a media final do aluno ${index}: `);

    alunos[index] = new Aluno(nome, matricula, media);
  }

  return alunos;
}

relatorioAlunos(receberAlunos());
