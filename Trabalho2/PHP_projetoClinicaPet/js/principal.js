function deletarCliente(cod) {
  if (confirm('Você tem certeza que deseja deletar este cliente?')) {
    $.post(
      '../include/deletarRegistros.php',
      {
        idClienteDeletar: cod,
      },
      function (valor) {
        $('#mensagem').html(valor);
      },
    );
  }
}

function deletarPet(cod) {
  if (confirm('Você tem certeza que deseja deletar este Pet?')) {
    $.post(
      '../include/deletarRegistros.php',
      {
        idPetDeletar: cod,
      },
      function (valor) {
        $('#mensagem').html(valor);
      },
    );
  }
}
