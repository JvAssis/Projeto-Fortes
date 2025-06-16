document.getElementById('sair-conta').onclick = function () {
  window.location.href = 'home.html'; // Altere para o destino desejado
};
console.log('Arquivo JS correto carregado!');
  // Excluir resíduo
  let trParaExcluir = null;

  // Delegação para botões de excluir (inclusive os adicionados dinamicamente)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('excluir-btn')) {
      trParaExcluir = e.target.closest('tr');
      document.getElementById('popup-excluir-bg').classList.add('active');
    }
  });

  // Fechar popup de exclusão
  document.getElementById('close-popup-excluir').onclick = function() {
    document.getElementById('popup-excluir-bg').classList.remove('active');
    trParaExcluir = null;
  };
  document.getElementById('cancelar-excluir').onclick = function() {
    document.getElementById('popup-excluir-bg').classList.remove('active');
    trParaExcluir = null;
  };

  // Confirmar exclusão
  document.getElementById('confirmar-excluir').onclick = function() {
    if (trParaExcluir) {
      trParaExcluir.remove();
      trParaExcluir = null;
    }
    document.getElementById('popup-excluir-bg').classList.remove('active');
  };

  // Adiciona botão de excluir nas novas linhas criadas pelo cadastro
  document.getElementById('form-residuo').addEventListener('submit', function() {
    setTimeout(function() {
      const linhas = document.querySelectorAll('#residuos-tbody tr');
      const ultima = linhas[linhas.length - 1];
      if (ultima && !ultima.querySelector('.excluir-btn')) {
        const td = document.createElement('td');
        td.innerHTML = '<button class="excluir-btn" type="button">Excluir</button>';
        ultima.appendChild(td);
      }
    }, 10);
  });

document.addEventListener('DOMContentLoaded', function () {
    // Abrir popup
    document.getElementById('btn-cadastrar').onclick = function () {
        document.getElementById('popup-bg').classList.add('active');
    };
    // Fechar popup
    document.getElementById('close-popup').onclick = function () {
        document.getElementById('popup-bg').classList.remove('active');
    };
    document.getElementById('cancelar-popup').onclick = function () {
        document.getElementById('popup-bg').classList.remove('active');
    };
    // Submeter formulário

    
document.getElementById('form-residuo').onsubmit = function (e) {
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
  const tbody = document.getElementById('residuos-tbody');
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
  tbody.appendChild(tr);
  // Fecha popup e reseta form
  document.getElementById('popup-bg').classList.remove('active');
  document.getElementById('form-residuo').reset();
};});

 // --- CRONOGRAMA POPUP E CALENDÁRIO ---

        // Função para obter as datas dos eventos da tabela
        function getEventDates() {
          const trs = document.querySelectorAll('#residuos-tbody tr');
          const dates = [];
          trs.forEach(tr => {
            // Data Coletado está na segunda coluna (td[1])
            const tds = tr.querySelectorAll('td');
            if (tds.length > 1) {
              const data = tds[1].textContent.trim();
              if (data) dates.push(data);
            }
          });
          return dates;
        }

        // Função para criar o calendário
        function renderCalendar(eventDates) {
          // eventDates: array de datas no formato dd/mm/aaaa
          const container = document.getElementById('calendar-container');
          container.innerHTML = '';

          // Pega o mês/ano do primeiro evento ou do mês atual
          let refDate = new Date();
          if (eventDates.length > 0) {
            const [d, m, y] = eventDates[0].split('/');
            refDate = new Date(`${y}-${m}-${d}`);
          }
          const year = refDate.getFullYear();
          const month = refDate.getMonth();

          // Cabeçalho do calendário
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

          // Dias da semana
          const trDias = document.createElement('tr');
          ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].forEach(dia => {
            const thDia = document.createElement('th');
            thDia.textContent = dia;
            thDia.style.background = '#e3ecd6';
            trDias.appendChild(thDia);
          });
          thead.appendChild(trDias);
          table.appendChild(thead);

          // Corpo do calendário
          const tbody = document.createElement('tbody');
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();

          let tr = document.createElement('tr');
          // Espaços em branco antes do primeiro dia
          for (let i = 0; i < firstDay; i++) {
            tr.appendChild(document.createElement('td'));
          }

          // Prepara datas para highlight
          const eventSet = new Set(eventDates);

          for (let day = 1; day <= daysInMonth; day++) {
            const td = document.createElement('td');
            td.textContent = day;

            // Formata a data para comparar
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
        document.getElementById('btn-cronograma').onclick = function () {
          const eventDates = getEventDates();
          renderCalendar(eventDates);
          document.getElementById('popup-cronograma-bg').classList.add('active');
        };

        // Fechar popup do cronograma
        document.getElementById('close-popup-cronograma').onclick = function () {
          document.getElementById('popup-cronograma-bg').classList.remove('active');
        };

        // Atualiza o calendário ao adicionar novo evento
        document.getElementById('form-residuo').addEventListener('submit', function () {
          setTimeout(function () {
            if (document.getElementById('popup-cronograma-bg').classList.contains('active')) {
              const eventDates = getEventDates();
              renderCalendar(eventDates);
            }
          }, 20);
        });

        document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...

    // Adiciona automaticamente o evento "Evento y" ao carregar a página
    const tbody = document.getElementById('residuos-tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Evento y</td>
      <td>12/06/2025</td>
      <td>80kg</td>
      <td>Vila Velha</td>
      <td>Papel</td>
      <td>18/06/2025</td>
      <td>1234</td>
      <td><button class="excluir-btn" type="button">Excluir</button></td>
    `;
    tbody.appendChild(tr);

    // ...existing code...
});