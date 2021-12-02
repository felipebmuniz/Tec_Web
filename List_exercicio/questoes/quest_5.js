class Telefone {
  constructor(DDD, numero) {
    this.ddd = DDD;
    this.numero = numero;
  }

  listarNumero() {
    console.log('DDD: ' + this.ddd);
    console.log('Numero: ' + this.numero);
  }
}

class Anivesario extends Telefone {
  constructor(dia, mes, ano, DDD, numero) {
    super(DDD, numero);
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
  }

  listarAniversario() {
    console.log('Dia: ' + this.dia);
    console.log('Mes: ' + this.mes);
    console.log('Ano: ' + this.ano);
  }
}

class Endereco extends Anivesario {
  constructor(
    dia,
    mes,
    ano,
    DDD,
    numero,
    rua,
    numeroE,
    complemento,
    bairro,
    cep,
    cidade,
    estado,
    pais,
  ) {
    super(dia, mes, ano, DDD, numero);
    this.rua = rua;
    this.numeroE = numeroE;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.pais = pais;
  }

  listarEndereco() {
    console.log('Rua: ' + this.rua);
    console.log('Numero: ' + this.numero);
    console.log('Complemento: ' + this.complemento);
    console.log('Bairro: ' + this.bairro);
    console.log('Cep: ' + this.cep);
    console.log('Cidade: ' + this.cidade);
    console.log('Estado: ' + this.estado);
    console.log('Pais: ' + this.pais);
  }
}

class Pessoa extends Endereco {
  constructor(
    nome,
    email,
    DDD,
    numero,
    dia,
    mes,
    ano,
    rua,
    numeroE,
    complemento,
    bairro,
    cep,
    cidade,
    estado,
    pais,
    obs,
  ) {
    super(
      dia,
      mes,
      ano,
      DDD,
      numero,
      rua,
      numeroE,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      pais,
    );
    this.nome = nome;
    this.email = email;
    this.obs = obs;
  }

  get getPessoa() {
    return {
      nome: this.nome,
      email: this.email,
      DDD: this.ddd,
      numero: this.numero,
      dia: this.dia,
      mes: this.mes,
      ano: this.ano,
      rua: this.rua,
      numeroE: this.numeroE,
      complemento: this.complemento,
      bairro: this.bairro,
      cep: this.cep,
      cidade: this.cidade,
      estado: this.estado,
      pais: this.pais,
      obs: this.obs,
    };
  }

  listarDados() {
    console.log('\n-------Dados das Pessoas-------\n');
    console.log('Email: ' + this.email);
    super.listarNumero();
  }

  listarAniversario() {
    console.log('\n-------Dados de Aniversario-------\n');
    super.listarAniversario();
  }

  listarNome() {
    console.log('\n-------Lista de Nomes-------\n');
    console.log('Nome: ' + this.nome);
  }

  listarPessoa() {
    console.log('\n-----------------------------------\n');
    console.log('\nNome: ' + this.nome);
    console.log('Email: ' + this.email);
    super.listarNumero();
    super.listarAniversario();
    super.listarEndereco();
    console.log('Obs: ' + this.obs);
    console.log('\n-----------------------------------\n');
  }
}

// instalar pacote para recepção de dados via terminal npm install readline-sync
var readlineSync = require('readline-sync');

function adicionarPessoa(agenda) {
  if (agenda.length === 100) {
    console.log('\nAgenda cheia.\n');
    return;
  }

  console.log('\n-------Dados Pessoais-------\n');
  let nome = readlineSync.question(`\nDigite o Nome: `);
  let email = readlineSync.question(`\nDigite o Email: `);
  console.log('\n-------Dados Telefone-------\n');
  let DDD = readlineSync.question(`\nDigite o DDD: `);
  let numero = readlineSync.question(`\nDigite o Numero: `);
  console.log('\n-------Dados Aniversario-------\n');
  let dia = readlineSync.question(`\nDigite o Dia: `);
  let mes = readlineSync.question(`\nDigite o Mes: `);
  let ano = readlineSync.question(`\nDigite o Ano: `);
  console.log('\n-------Dados Endereco-------\n');
  let rua = readlineSync.question(`\nDigite a Rua: `);
  let numeroE = readlineSync.question(`\nDigite o Numero: `);
  let complemento = readlineSync.question(`\nDigite o Complemento: `);
  let bairro = readlineSync.question(`\nDigite o Bairro: `);
  let cep = readlineSync.question(`\nDigite o CEP: `);
  let cidade = readlineSync.question(`\nDigite a Cidade: `);
  let estado = readlineSync.question(`\nDigite o Estado: `);
  let pais = readlineSync.question(`\nDigite o Pais: `);
  console.log('\n-------Dados de Observacao-------\n');
  let obs = readlineSync.question(`\nDigite a Observacao: `);

  agenda.push(
    new Pessoa(
      nome,
      email,
      DDD,
      numero,
      dia,
      mes,
      ano,
      rua,
      numeroE,
      complemento,
      bairro,
      cep,
      cidade,
      estado,
      pais,
      obs,
    ),
  );
  organizaAgenda(agenda);
}

function buscarPorNome(agenda) {
  let nome = readlineSync.question(`\nDigite o Nome para pesquisa: `);
  agenda.forEach((pessoa) => {
    if (pessoa.getPessoa.nome === nome) {
      console.log('\n Resutado Busca por nome\n');
      pessoa.listarPessoa();
    }
  });
}

function buscarPorAniversarioMes(agenda) {
  let mes = readlineSync.question(`\nDigite o Mes para pesquisa: `);
  agenda.forEach((pessoa) => {
    if (pessoa.getPessoa.mes === mes) {
      console.log('\n Resutado Busca por mes de aniversario\n');
      pessoa.listarPessoa();
    }
  });
}

function buscarPorAniversarioDiaEMes(agenda) {
  let dia = readlineSync.question(`\nDigite o Dia para pesquisa: `);
  let mes = readlineSync.question(`\nDigite o Mes para pesquisa: `);
  agenda.forEach((pessoa) => {
    if (pessoa.getPessoa.dia === dia) {
      if (pessoa.getPessoa.mes === mes) {
        console.log('\n Resutado Busca por mes e dia de aniversario\n');
        pessoa.listarPessoa();
      }
    }
  });
}

function organizaAgenda(agendaDesorganizada) {
  const agendaOrganizada = agendaDesorganizada.sort((a, b) => {
    return a.getPessoa.nome > b.getPessoa.nome
      ? 1
      : b.getPessoa.nome > a.getPessoa.nome
      ? -1
      : 0;
  });
  agenda = agendaOrganizada;
}

function removerPessoa(agenda) {
  let nome = readlineSync.question(`\nDigite o Nome para remocao: `);
  const existePessoa = agenda.find((pessoa) => pessoa.getPessoa.nome === nome);
  if (!existePessoa) {
    console.log('Pessoa não encontrada.');
    return;
  }
  const aux = [];
  agenda.forEach((pessoa) => {
    if (pessoa.getPessoa.nome != nome) {
      aux.push(pessoa);
      console.log('Remoção realizada.');
    }
  });
  agenda = aux;
}

let agenda = [];
let codigo;

do {
  console.log(
    '\nBem vindo ao MENU AGENDA !!!\nDigite o numero de umas das opções abaixo: \n',
  );
  console.log(
    ' [A] Adicionar Pessoa;\n [R] Remover Pessoa;\n [N] Buscar Pessoa por primeiro nome;\n [M] Buscar Pessoa por mes de aniversario;\n [D] Buscar Pessoa por dia e mes de aniversario;\n [1] Imprime nome;\n [2] Imprime Telefone e e-mail;\n [3] Imprime todos os dados;\n [0] Para sair;\n',
  );

  codigo = readlineSync.question('Qual opcao voce deseja? ');

  switch (codigo) {
    case 'A':
      adicionarPessoa(agenda);
      break;
    case 'R':
      removerPessoa(agenda);
      break;
    case 'N':
      buscarPorNome(agenda);
      break;
    case 'M':
      buscarPorAniversarioMes(agenda);
      break;
    case 'D':
      buscarPorAniversarioDiaEMes(agenda);
      break;
    case '1':
      agenda.forEach((pessoa) => pessoa.listarNome());
      break;
    case '2':
      agenda.forEach((pessoa) => pessoa.listarDados());
      break;
    case '3':
      agenda.forEach((pessoa) => pessoa.listarPessoa());
      break;

    default:
      break;
  }
} while (codigo != '0');

process.exit();
