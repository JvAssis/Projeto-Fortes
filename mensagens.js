
document.addEventListener('DOMContentLoaded', function () {
  // Abrir popup de mensagem
  document.getElementById('btn-cadastrar').onclick = function () {
    document.getElementById('popup-bg').classList.add('active');
  };


  
  // Fechar popup de mensagem
  document.getElementById('close-popup').onclick = function () {
    document.getElementById('popup-bg').classList.remove('active');
  };
  document.getElementById('cancelar-popup').onclick = function () {
    document.getElementById('popup-bg').classList.remove('active');
  };

  // Variável para armazenar a linha a ser excluída
  let trParaExcluir = null;

  // Delegação para botões de excluir (inclusive os adicionados dinamicamente)
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('excluir-btn')) {
      trParaExcluir = e.target.closest('tr');
      document.getElementById('popup-excluir-bg').classList.add('active');
    }
  });

  // Fechar popup de exclusão
  document.getElementById('close-popup-excluir').onclick = function () {
    document.getElementById('popup-excluir-bg').classList.remove('active');
    trParaExcluir = null;
  };
  document.getElementById('cancelar-excluir').onclick = function () {
    document.getElementById('popup-excluir-bg').classList.remove('active');
    trParaExcluir = null;
  };

  // Confirmar exclusão
  document.getElementById('confirmar-excluir').onclick = function () {
    if (trParaExcluir) {
      trParaExcluir.remove();
      trParaExcluir = null;
    }
    document.getElementById('popup-excluir-bg').classList.remove('active');
  };

  // Submeter formulário de mensagem
  document.getElementById('form-mensagem').onsubmit = function (e) {
    e.preventDefault();
    // Fecha popup e reseta form
    document.getElementById('popup-bg').classList.remove('active');
    document.getElementById('form-mensagem').reset();
    // Alerta de sucesso
    alert('Mensagem enviada com sucesso!');
  };

  // Fecha popups ao clicar fora deles
  window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('popup-bg')) {
      document.getElementById('popup-bg').classList.remove('active');
    }
    if (e.target === document.getElementById('popup-excluir-bg')) {
      document.getElementById('popup-excluir-bg').classList.remove('active');
    }
  });
});

