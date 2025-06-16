document.getElementById('sair-conta').onclick = function () {
  window.location.href = 'home.html'; // Altere para o destino desejado
};

// Alternar menu lateral
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});


function esconderNotificacao(botao) {
  botao.parentElement.style.display = 'none';
}

function esconderNotificacao(botao) {
  botao.parentElement.style.display = 'none';

  // Verifica se todas as notificações estão ocultas
  const notificacoes = document.querySelectorAll('.conteudo-notificacao1, .conteudo-notificacao2');
  const todasOcultas = Array.from(notificacoes).every(div => div.style.display === 'none');

  if (todasOcultas) {
    document.querySelector('.sem-notificacao').style.display = 'block';
  }
}

//codigo do calendário

document.addEventListener('DOMContentLoaded', function() {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  let anoAtual = 2025;
  let mesAtual = 0; // Janeiro

  function renderizarCalendario() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemana = primeiroDia.getDay();

    document.getElementById('mes-atual').textContent = `${meses[mesAtual]} ${anoAtual}`;

    let html = '';
    let dia = 1;
    for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < diaSemana) || dia > diasNoMes) {
          html += '<td></td>';
        } else {
          html += `<td>${dia}</td>`;
          dia++;
        }
      }
      html += '</tr>';
      if (dia > diasNoMes) break;
    }
    document.getElementById('corpo-calendario').innerHTML = html;
  }

  document.getElementById('prev-mes').onclick = function() {
    mesAtual--;
    if (mesAtual < 0) {
      mesAtual = 11;
      anoAtual--;
    }
    renderizarCalendario();
  };

  document.getElementById('prox-mes').onclick = function() {
    mesAtual++;
    if (mesAtual > 11) {
      mesAtual = 0;
      anoAtual++;
    }
    renderizarCalendario();
  };

  renderizarCalendario();
});