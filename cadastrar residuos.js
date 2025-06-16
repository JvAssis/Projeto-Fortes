document.addEventListener('DOMContentLoaded', function () {
  // Botão sair
  const sairBtn = document.getElementById('sair-conta');
  if (sairBtn) {
    sairBtn.onclick = function() {
      window.location.href = 'home.html';
    };
  }

  // --- POPUP DE CADASTRO ---
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const popupBg = document.getElementById('popup-bg');
  const closePopup = document.getElementById('close-popup');
  const cancelarPopup = document.getElementById('cancelar-popup');
  if (btnCadastrar && popupBg) {
    btnCadastrar.onclick = function () {
      popupBg.classList.add('active');
    };
  }
  if (closePopup && popupBg) {
    closePopup.onclick = function () {
      popupBg.classList.remove('active');
    };
  }
  if (cancelarPopup && popupBg) {
    cancelarPopup.onclick = function () {
      popupBg.classList.remove('active');
    };
  }

  // --- EXCLUIR RESÍDUO ---
  let trParaExcluir = null;
  const popupExcluirBg = document.getElementById('popup-excluir-bg');
  const closePopupExcluir = document.getElementById('close-popup-excluir');
  const cancelarExcluir = document.getElementById('cancelar-excluir');
  const confirmarExcluir = document.getElementById('confirmar-excluir');

  // Delegação para botões de excluir
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('excluir-btn')) {
      trParaExcluir = e.target.closest('tr');
      if (popupExcluirBg) popupExcluirBg.classList.add('active');
    }
  });

  if (closePopupExcluir && popupExcluirBg) {
    closePopupExcluir.onclick = function () {
      popupExcluirBg.classList.remove('active');
      trParaExcluir = null;
    };
  }
  if (cancelarExcluir && popupExcluirBg) {
    cancelarExcluir.onclick = function () {
      popupExcluirBg.classList.remove('active');
      trParaExcluir = null;
    };
  }
  if (confirmarExcluir && popupExcluirBg) {
    confirmarExcluir.onclick = function () {
      if (trParaExcluir) {
        trParaExcluir.remove();
        trParaExcluir = null;
      }
      popupExcluirBg.classList.remove('active');
    };
  }

  // --- FORMULÁRIO DE CADASTRO ---
  const formResiduo = document.getElementById('form-residuo');
  const residuosTbody = document.getElementById('residuos-tbody');
  if (formResiduo && residuosTbody) {
    formResiduo.onsubmit = function (e) {
      e.preventDefault();
      // Pega os valores
      const nome = document.getElementById('nome-evento').value;
      const dataColeta = document.getElementById('data-coleta').value
        ? document.getElementById('data-coleta').value.split('-').reverse().join('/')
        : '';
      const peso = document.getElementById('peso').value ? document.getElementById('peso').value + 'kg' : '';
      const ponto = document.getElementById('ponto-coleta').value;
      const tipos = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(cb => cb.value).join(', ');
      const previsao = document.getElementById('previsao-entrega').value
        ? document.getElementById('previsao-entrega').value.split('-').reverse().join('/')
        : '';
      const observacoes = document.getElementById('observacoes').value;

      // Adiciona na tabela
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${nome}</td>
        <td>${dataColeta}</td>
        <td>${peso}</td>
        <td>${ponto}</td>
        <td>${tipos}</td>
        <td>${previsao}</td>
        <td>${observacoes}</td>
        <td><button class="excluir-btn" type="button">Excluir</button></td>
      `;
      residuosTbody.appendChild(tr);

      // Fecha popup e reseta form
      popupBg.classList.remove('active');
      formResiduo.reset();

      // Atualiza calendário se estiver aberto
      setTimeout(function () {
        if (document.getElementById('popup-cronograma-bg')?.classList.contains('active')) {
          const eventDates = getEventDates();
          renderCalendar(eventDates);
        }
      }, 20);
    };
  }

  // --- CRONOGRAMA POPUP E CALENDÁRIO ---
  function getEventDates() {
    const trs = document.querySelectorAll('#residuos-tbody tr');
    const dates = [];
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      if (tds.length > 1) {
        const data = tds[1].textContent.trim();
        if (data) dates.push(data);
      }
    });
    return dates;
  }

  function renderCalendar(eventDates) {
    const container = document.getElementById('calendar-container');
    if (!container) return;
    container.innerHTML = '';

    let refDate = new Date();
    if (eventDates.length > 0) {
      const [d, m, y] = eventDates[0].split('/');
      refDate = new Date(`${y}-${m}-${d}`);
    }
    const year = refDate.getFullYear();
    const month = refDate.getMonth();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const table = document.createElement('table');
    table.className = 'tabela-custom';
    table.style.background = '#fcf6e1';
    table.style.margin = '0 auto';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const th = document.createElement('th');
    th.colSpan = 7;
    th.style.textAlign = 'center';
    th.style.background = '#fcf6e1';
    th.style.fontSize = '1.2rem';
    th.textContent = `${monthNames[month]} / ${year}`;
    trHead.appendChild(th);
    thead.appendChild(trHead);

    const trDias = document.createElement('tr');
    ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(dia => {
      const thDia = document.createElement('th');
      thDia.textContent = dia;
      thDia.style.background = '#e3ecd6';
      trDias.appendChild(thDia);
    });
    thead.appendChild(trDias);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let tr = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
      tr.appendChild(document.createElement('td'));
    }

    const eventSet = new Set(eventDates);

    for (let day = 1; day <= daysInMonth; day++) {
      const td = document.createElement('td');
      td.textContent = day;

      const diaStr = day.toString().padStart(2, '0');
      const mesStr = (month + 1).toString().padStart(2, '0');
      const dataStr = `${diaStr}/${mesStr}/${year}`;

      if (eventSet.has(dataStr)) {
        td.style.background = '#a4c39b';
        td.style.color = '#2b5141';
        td.style.fontWeight = 'bold';
        td.style.borderRadius = '8px';
      } else {
        td.style.background = '#fcf6e1';
      }

      tr.appendChild(td);

      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        tbody.appendChild(tr);
        tr = document.createElement('tr');
      }
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }

  // Abrir popup do cronograma
  const btnCronograma = document.getElementById('btn-cronograma');
  const popupCronogramaBg = document.getElementById('popup-cronograma-bg');
  const closePopupCronograma = document.getElementById('close-popup-cronograma');
  if (btnCronograma && popupCronogramaBg) {
    btnCronograma.onclick = function () {
      const eventDates = getEventDates();
      renderCalendar(eventDates);
      popupCronogramaBg.classList.add('active');
    };
  }
  if (closePopupCronograma && popupCronogramaBg) {
    closePopupCronograma.onclick = function () {
      popupCronogramaBg.classList.remove('active');
    };
  }
});