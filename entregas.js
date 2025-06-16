document.getElementById('sair-conta').onclick = function () {
  window.location.href = 'home.html'; // Altere para o destino desejado
};
const btn = document.getElementById('btn-expandir-mapa');
const iframe = document.getElementById('mapa-integrado');
let expandido = false;
const larguraOriginal = '600px';
const alturaOriginal = '450px';

btn.addEventListener('click', function () {
  expandido = !expandido;
  if (expandido) {
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    btn.textContent = 'Diminuir Mapa';
  } else {
    iframe.style.width = larguraOriginal;
    iframe.style.height = alturaOriginal;
    btn.textContent = 'Expandir Mapa';
  }
});


const eventos = [
  {
    nome: "Evento X",
    data: "2025-06-16",
    peso: 12,
    ponto: "Ponto Central",
    tipo: "Papel",
    previsao: "2025-06-20",
    entregue: false
  },
  {
    nome: "Evento Y",
    data: "2025-07-03",
    peso: 8,
    ponto: "Ponto Norte",
    tipo: "Plástico",
    previsao: "2025-07-08",
    entregue: false
  },
  {
    nome: "Evento Z",
    data: "2025-05-22",
    peso: 15,
    ponto: "Ponto Sul",
    tipo: "Metal",
    previsao: "2025-05-27",
    entregue: false
  }
];

let ordemAtual = eventos.map((_, idx) => idx);
let idxParaEntregar = null;

function renderTabela(lista, ordem) {
  const corpo = document.getElementById('corpo-tabela');
  corpo.innerHTML = '';
  lista.forEach((ev, i) => {
    corpo.innerHTML += `
      <tr>
        <td>
          <button class="botao-rastrear" onclick="feedbackRastrear(this)">Rastrear</button>
        </td>
        <td>${ev.nome}</td>
        <td>${formatarData(ev.data)}</td>
        <td>${ev.peso}kg</td>
        <td>${ev.ponto}</td>
        <td>${ev.tipo}</td>
        <td>${formatarData(ev.previsao)}</td>
        <td>
          <span class="${ev.entregue ? 'status-entregue' : 'status-pendente'}">
            ${ev.entregue ? 'Entregue' : 'Pendente'}
          </span>
        </td>
        <td>
          ${!ev.entregue ? `<button class="botao-entregue" onclick="abrirPopup(${ordem[i]})">Marcar como Entregue</button>` : ''}
        </td>
      </tr>
    `;
  });
  // Preenche linhas vazias para manter o layout
  for (let i = lista.length; i < 5; i++) {
    corpo.innerHTML += `
      <tr>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>
    `;
  }
}

function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function filtrarTabela() {
  const filtroOrdem = document.getElementById('filtro-ordem').value;

  let filtrados = eventos.map((ev, idx) => ({ ...ev, _idx: idx }));

  if (filtroOrdem === 'data') {
    filtrados.sort((a, b) => a.data.localeCompare(b.data));
  } else if (filtroOrdem === 'peso') {
    filtrados.sort((a, b) => a.peso - b.peso);
  } else if (filtroOrdem === 'tipo') {
    filtrados.sort((a, b) => a.tipo.localeCompare(b.tipo));
  }

  ordemAtual = filtrados.map(ev => ev._idx);

  renderTabela(filtrados, ordemAtual);
}

function feedbackRastrear(btn) {
  btn.classList.add('ativo');
  setTimeout(() => {
    btn.classList.remove('ativo');
  }, 400);
}

function abrirPopup(idx) {
  idxParaEntregar = idx;
  document.getElementById('popup-confirmacao').style.display = 'flex';
}

function fecharPopup() {
  idxParaEntregar = null;
  document.getElementById('popup-confirmacao').style.display = 'none';
}

document.getElementById('popup-sim').onclick = function () {
  if (idxParaEntregar !== null) {
    eventos[idxParaEntregar].entregue = true;
    fecharPopup();
    filtrarTabela();
  }
};

document.getElementById('popup-nao').onclick = function () {
  fecharPopup();
};

// Inicializa tabela
filtrarTabela();
