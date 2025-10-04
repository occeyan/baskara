#!/usr/bin/env node
// CLI version of Bhaskara (moved to cli/index.js)
const readline = require('readline');

function calcularBhaskara(a, b, c) {
  a = Number(a);
  b = Number(b);
  c = Number(c);

  if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    throw new Error('Coeficientes inválidos. Use números.');
  }

  if (a === 0) {
    if (b === 0) {
      if (c === 0) return { type: 'identity', roots: [] };
      return { type: 'inconsistent', roots: [] };
    }
    return { type: 'linear', roots: [ -c / b ] };
  }

  const delta = b * b - 4 * a * c;
  if (delta < 0) return { type: 'complex', delta, roots: [] };
  if (delta === 0) return { type: 'double', delta, roots: [ -b / (2 * a) ] };
  const sqrtDelta = Math.sqrt(delta);
  const x1 = (-b + sqrtDelta) / (2 * a);
  const x2 = (-b - sqrtDelta) / (2 * a);
  return { type: 'real', delta, roots: [x1, x2] };
}

function formatResult(result) {
  switch (result.type) {
    case 'identity': return 'Equação verdadeira para todos os x (0 = 0).';
    case 'inconsistent': return 'Equação inconsistente (sem solução).';
    case 'linear': return `Equação linear. Raiz: ${result.roots[0]}`;
    case 'complex': return `Delta = ${result.delta} < 0 → raízes complexas (não calculadas).`;
    case 'double': return `Delta = ${result.delta}. Raiz dupla: ${result.roots[0]}`;
    case 'real': return `Delta = ${result.delta}. Raízes: ${result.roots[0]} e ${result.roots[1]}`;
    default: return 'Resultado desconhecido.';
  }
}

function runFromArgs(args) {
  try {
    const res = calcularBhaskara(args[0], args[1], args[2]);
    console.log(formatResult(res));
  } catch (err) {
    console.error('Erro:', err.message);
    process.exit(1);
  }
}

function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const perguntas = ['a (coeficiente de x^2): ', 'b (coeficiente de x): ', 'c (termo independente): '];
  const respostas = [];
  const pergunta = (i) => {
    if (i >= perguntas.length) {
      rl.close();
      try {
        const res = calcularBhaskara(respostas[0], respostas[1], respostas[2]);
        console.log(formatResult(res));
      } catch (err) {
        console.error('Erro:', err.message);
        process.exit(1);
      }
      return;
    }
    rl.question(perguntas[i], (answer) => {
      respostas.push(answer.trim());
      pergunta(i + 1);
    });
  };
  pergunta(0);
}

const argv = process.argv.slice(2);
if (argv.length === 3) runFromArgs(argv); else {
  console.log('Executando em modo interativo. Você também pode usar: node cli/index.js a b c');
  runInteractive();
}
