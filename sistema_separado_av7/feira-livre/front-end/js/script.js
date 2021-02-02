$(function () {
  
  function mostrarAlimentos() {
    $.ajax({
      url: 'http://localhost:5000/itens_feira',
      method: 'GET',
      dataType: 'json',
      success: listarAlimento,
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });

    function listarAlimento(alimentos) {
      $("#tableBody").empty();
      showContent("tabela-alimento");
      var linhas = '';
  
      for (alimento of alimentos) {
        novaLinha = `<tr id="linha_${alimento.id}">  
                          <td>${alimento.id}</td> 
                          <td>${alimento.nome_alimento}</td> 
                          <td>${alimento.preco_por_kilo}</td> 
                          <td>${alimento.safra}</td> 
                          <td>
                            <a href="#" id="deletar_${alimento.id}" class="deletar_alimentos" title="Excluir Alimento">
                                <span class="material-icons">
                                  delete
                                </span>
                            </a>
                          </td>
                        </tr>`;
        linhas += novaLinha;
        $('#tableBody').html(linhas);
      }
    }
  }
  function showContent(nextPage) {
    $("#inicio").addClass("d-none");
    $("#tabela-alimento").addClass("d-none");
    $("#tabela-fornecedoras").addClass("d-none");
    $("#tabela-descartadoras").addClass("d-none");
    $(`#${nextPage}`).removeClass("d-none");
  }

  $('#link-listar').click(function () {
    mostrarAlimentos();
  });

  $("#link-inicial").click(function() {
    showContent("inicio");
  });

  $('#nav-brand').click(function () {
    showContent("inicio");
  });

  $(document).on("click", "#btn-incluir", function() {
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
  });
  
  $('#modal-incluir').on('hidden.bs.modal', function(e) {
    if (!$('#tabela-alimento').hasClass('invisible')) {
      mostrarAlimentos();
    }
  });
  
  
  
  $(document).on("click", ".deletar_alimentos", function() {
    var component = $(this).attr("id");

    var icon_name = "deletar_";
    var alimento_id = component.substring(icon_name.length);

    $.ajax({
      url: 'http://localhost:5000/deletar_alimentos/' + alimento_id,
      type: "DELETE",
      dataType: "json",
      success: alimentoDeletado,
      error: alimentoDeletadoErro
    });

    function alimentoDeletado(retorno) {
      if (retorno.result == "ok") {
        $('#linha_' + alimento_id).fadeOut(1000, function() {
          alert("Alimento Removido com Sucesso!");
          mostrarAlimentos();
        });
      } else {
          alert(`${retorno.result}: ${retorno.details}`);
      }
    }

    function alimentoDeletadoErro(response) {
      alert("Erro ao excluir dados, verifique o Backend!");
    }
  });

  function listar_fornecedoras() {
    $.ajax({
        url: 'http://localhost:5000/listar_fornecedoras',
        method: 'GET',
        dataType: 'json', 
        success: listar, 
        error: function(problema) {
            alert("erro ao ler dados, verifique o backend: ");
        }
    });
    function listar (fornecedoras) {
        $('#corpoTabelaFornecedoras').empty();
        showContent("tabela-fornecedoras")    
        var linhas = '';
        for (fornecedora of fornecedoras) { 
            novaLinha = '<tr id="linha_fornecedora'+fornecedora.id+'">' + 
            '<td>' + fornecedora.nome + '</td>' + 
            '<td>' + fornecedora.local + '</td>' + 
            '<td>' + fornecedora.feiralivre.nome_alimento + '</td>' + 
            '<td>' + fornecedora.feiralivre.safra + '</td>' + 
            '</tr>';
            linhas += novaLinha;
            $('#corpoTabelaFornecedoras').append(novaLinha);
        }
    }
  }

  $(document).on("click", "#linkListarFornecedoras", function() {
    listar_fornecedoras();
  });


  function listar_descartadoras() {
    $.ajax({
        url: 'http://localhost:5000/listar_descartadoras',
        method: 'GET',
        dataType: 'json',
        success: listar,
        error: function(problema) {
            alert("erro ao ler dados, verifique o backend: ");
        }
    });
    function listar (descartadoras) {
        $('#corpoTabelaDescartadoras').empty();
        showContent("tabela-descartadoras")      
        var linhas = '';
        for (descartadora of descartadoras) { 
            novaLinha = '<tr id="linha_descartadora'+descartadora.id+'">' + 
            '<td>' + descartadora.nome + '</td>' + 
            '<td>' + descartadora.feiralivre.nome_alimento + '</td>' + 
            '<td>' + descartadora.feiralivre.safra + '</td>' + 
            '</tr>';
            linhas += novaLinha;
            $('#corpoTabelaDescartadoras').append(novaLinha);
        }
    }
  }

  $(document).on("click", "#linkListarDescartadoras", function() {
    listar_descartadoras();
  });
  showContent("inicio");
});


