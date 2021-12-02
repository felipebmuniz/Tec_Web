class Produto {
  constructor(codigo, nome, preco, quantidade) {
    this.codigo = parseInt(codigo);
    this.nome = nome;
    this.preco = parseFloat(preco);
    this.quantidade = parseInt(quantidade);
  }

  get getProduto() {
    return {
      codigo: this.codigo,
      nome: this.nome,
      preco: this.preco,
      quantidade: this.quantidade,
    };
  }

  set estoqueProduto(quantidadeProduto) {
    this.quantidade = this.quantidade - quantidadeProduto;
  }
}

function receberProdutos(produtos) {
  var codigo, nome, preco, quantidade;
  for (let index = 0; index < 5; index++) {
    do {
      codigo = readlineSync.question(
        `\nDigite o codigo do produto ${index} (Aceita somente numero) : `,
      );
    } while (typeof Number(codigo) == Number);

    do {
      nome = readlineSync.question(
        `Digite o nome do produto ${index} (Mximo de 15 caracteres e minimo de 1): `,
      );
    } while (nome.length > 15 || nome.length < 0);

    preco = readlineSync.question(`Digite o preco do produto ${index}: `);

    quantidade = readlineSync.question(
      `Digite a quantidade do produto ${index}: `,
    );

    produtos[index] = new Produto(codigo, nome, preco, quantidade);
  }
}

function realizarPedido(produtos) {
  var codigo, quantidade, produto;

  console.log(
    '\nBem vindo, Realize seu pedido!!\nPara sair digite 0 em codigo.',
  );

  do {
    do {
      codigo = readlineSync.question(
        '\nDigite o codigo do produto (Aceita somente numero) : ',
      );
    } while (typeof Number(codigo) == Number);

    if (codigo !== '0') {
      quantidade = readlineSync.question('Digite a quantidade do produto : ');

      produto = produtos.filter(
        (produto) => produto.getProduto.codigo == parseInt(codigo),
      );

      produto.forEach((produto) => {
        if (codigo == produto.getProduto.codigo) {
          if (produto.getProduto.quantidade >= quantidade) {
            produtos.forEach((produto) => {
              if (codigo == produto.getProduto.codigo) {
                produto.estoqueProduto = quantidade;
              }
            });
            console.log('\nPedido realizado.');
          } else {
            console.log(
              '\nSem estoque do produto. Tente outro ou uma quantidade menor!',
            );
          }
        } else {
          console.log('Codigo invalido, tente um novo codigo.');
        }
      });
      console.log('\nPara sair digite 0 em codigo.');
    }
  } while (codigo != 0);

  console.log('\nVolte sempre!!');
}

// instalar pacote para recepção de dados via terminal npm install readline-sync
var readlineSync = require('readline-sync');
const produtos = [];

receberProdutos(produtos);

realizarPedido(produtos);

process.exit();
