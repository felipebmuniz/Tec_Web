const areaQuadrado = (base) => Math.pow(base, 2);

const areaRetangulo = (base, altura) => base * altura;

const areaTriangulo = (base, altura) => (base * altura) / 2;

const areaLosango = (diagonalMaior, diagonalMenor) =>
  (diagonalMaior * diagonalMenor) / 2;

console.log('Área do quadrado: ', areaQuadrado(2), 'cm');
console.log('Área do retângulo: ', areaRetangulo(4, 2), 'cm');
console.log('Área do triangulo: ', areaTriangulo(3, 5), 'cm');
console.log('Área do losango: ', areaLosango(7, 4), 'cm');
