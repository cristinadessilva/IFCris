$(function() {
    
    $.ajax({
        url: 'http://localhost:5000/listar_feira',
        method: 'GET',
        dataType: 'json', 
        success: listar, 
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (alimentos) {
        for (var i in alimentos) {
            lin = '<tr>' + 
                '<td>' + alimentos[i].id + '</td>'+
                '<td>' + alimentos[i].nome_alimento + '</td>' + 
                '<td>' + alimentos[i].preco_por_kilo + '</td>' + 
                '<td>' + alimentos[i].safra + '</td>' + 
                '</tr>';
            $('#corpoTabelaFeira').append(lin);
        }
    }

});

