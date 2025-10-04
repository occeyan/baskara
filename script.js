// script.js - lógica da UI da calculadora de Bhaskara
function calcularBhaskara(a, b, c) {
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    return { error: 'Insira números válidos para A, B e C.' };
  }
  if (a === 0) {
    if (b === 0) {
      if (c === 0) return { message: 'Equação verdadeira para todos os x (0 = 0).' };
      return { message: 'Equação inconsistente (sem solução).' };
    }
    return { message: `Equação linear. Raiz: ${(-c / b).toFixed(6)}` };
  }
  const delta = b * b - 4 * a * c;
  if (delta < 0) return { message: `Delta = ${delta}. Raízes complexas.` };
  if (delta === 0) return { message: `Delta = 0. Raiz dupla: ${(-b / (2 * a)).toFixed(6)}` };
  const sqrtDelta = Math.sqrt(delta);
  const x1 = (-b + sqrtDelta) / (2 * a);
  const x2 = (-b - sqrtDelta) / (2 * a);
  return { x1: x1, x2: x2, delta: delta };
}

function showResult(res) {
  const out = document.getElementById('output');
  out.innerHTML = '';
  if (res.error) {
    out.innerHTML = `<div class="error">Erro: ${res.error}</div>`;
    return;
  }
  if (res.message) {
    out.innerHTML = `<div class="message">${res.message}</div>`;
    return;
  }
  out.innerHTML = `<div class="result"><strong>Delta:</strong> ${res.delta}<br/><strong>Raízes:</strong> ${res.x1.toFixed(6)} e ${res.x2.toFixed(6)}</div>`;
}

document.getElementById('calc').addEventListener('click', () => {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const c = document.getElementById('c').value;
  const res = calcularBhaskara(a, b, c);
  showResult(res);
});

document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('a').value = '';
  document.getElementById('b').value = '';
  document.getElementById('c').value = '';
  document.getElementById('output').innerHTML = '';
});

// Permite calcular ao pressionar Enter no último campo
document.getElementById('c').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('calc').click();
});
