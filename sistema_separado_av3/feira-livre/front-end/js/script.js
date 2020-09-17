$(function () {
  changePage('inicial');
  $('#link-listar').click(function () {
    $.ajax({
      url: 'http://localhost:5000/itens_feira',
      method: 'GET',
      dataType: 'json',
      success: listarAlimento,
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });
  });

  $('#link-inicial').click(function () {
    changePage('inicial');
  });

  $('#nav-brand').click(function () {
    changePage('inicial');
  });

  $('#btn-incluir').click(function () {
    const nome = $('#campo-nome').val();
    const preco = $('#campo-preco').val();
    const safra = $('#campo-safra').val();

    const alimentoData = JSON.stringify({
      nome_alimento: nome,
      preco_por_kilo: preco,
      safra: safra,
    });

    $.ajax({
      url: 'http://localhost:5000/criar_alimento',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: alimentoData,
      success: criarAlimento,
      error: criarAlimentoErro,
    });
  });


  function criarAlimento(resposta) {
    if (resposta.result == 'ok') {
        alert('Alimento adicionado com sucesso')
        $('#campo-nome').val('');
        $('#campo-preco').val('');
        $('#campo-safra').val('');
    } else {
        alert('Erro na adição do alimento!')
    }
  }

  function criarAlimentoErro(resposta){
    alert('Erro na chamada do back-end')
  }

  function listarAlimento(alimentos) {
    var linhas = '';

    for (alimento of alimentos) {
      novaLinha = `<tr> 
                        <td>${alimento.id}</td> 
                        <td>${alimento.nome_alimento}</td> 
                        <td>${alimento.preco_por_kilo}</td> 
                        <td>${alimento.safra}</td> 
                      </tr>`;
      linhas += novaLinha;
      $('#tableBody').html(linhas);
    }
    changePage('listar');
  }

  function changePage(nextPage) {
    $('#container-inicial').addClass('invisible');
    $('#container-listar').addClass('invisible');
    $(`#container-${nextPage}`).removeClass('invisible');
  }
});
