document.getElementById('sair-conta').onclick = function () {
  window.location.href = 'home.html'; // Altere para o destino desejado
};
// Alternar menu lateral
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});

// Alternância de gráficos
const tipoGrafico = document.getElementById('tipoGrafico');
const graficoPizzaContainer = document.querySelector('.grafico-pizza');
const graficoBarraContainer = document.querySelector('.grafico-barra');

// Gráfico de Pizza
const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
const chartPizza = new Chart(ctxPizza, {
  type: 'pie',
  data: {
    labels: ['Comida', 'Papel'],
    datasets: [{
      data: [15, 10],
      backgroundColor: ['#99A88B', '#a4c39b'],
      borderColor: '#1f1c2e',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});

// Gráfico de Barras
const ctxBarra = document.getElementById('graficoBarra').getContext('2d');

const chartBarra = new Chart(ctxBarra, {
  type: 'bar',
  data: {
    labels: ['Comida', 'Papel'],
    datasets: [{
      label: 'Porcentagem de resíduos',
      data: [15, 10],
      backgroundColor: ['#99A88B', '#a4c39b'],
      borderColor: 'white',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});


// Alternar exibição entre gráficos
tipoGrafico.addEventListener('change', () => {
  if (tipoGrafico.value === 'Pizza') {
    graficoPizzaContainer.style.display = 'block';
    graficoBarraContainer.style.display = 'none';
  } else {
    graficoPizzaContainer.style.display = 'none';
    graficoBarraContainer.style.display = 'block';
  }
});



const verResumoBtn = document.getElementById('verResumoBtn');
const esconderResumoBtn = document.getElementById('esconderResumoBtn');
const resumoBox = document.querySelector('.resumo-box');

verResumoBtn.addEventListener('click', () => {
  resumoBox.classList.add('mostrar');
});

esconderResumoBtn.addEventListener('click', () => {
  resumoBox.classList.remove('mostrar');

  // Espera o fade-out terminar antes de ocultar totalmente
  setTimeout(() => {
    if (!resumoBox.classList.contains('mostrar')) {
      resumoBox.style.display = 'none';
    }
  }, 400); // igual ao tempo da transição CSS
});

// Quando a classe "mostrar" é adicionada, forçamos o display para garantir
const observer = new MutationObserver(() => {
  if (resumoBox.classList.contains('mostrar')) {
    resumoBox.style.display = 'block';
  }
});
observer.observe(resumoBox, { attributes: true });


function esconderNotificacao(botao) {
  botao.parentElement.style.display = 'none';
}