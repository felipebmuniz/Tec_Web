<?php
require "../login/autologin.php";
$objCliente = new Cliente();
$objCliente->selecionarClientes();
if ($objCliente->retornoBD != null) {
?>

  <div class="container">
    <div class="row">
      <div class="col-10">
        <form method="POST" action="">
          <div class="mb-3">
            <label for="nome-pet" class="form-label">Nome do Pet</label>
            <input type="text" class="form-control" id="nome-pet" aria-describedby="nomeHelp" name="nomePet">
            <div id="nomeHelp" class="form-text"></div>
          </div>

          <div class="mb-3">
            <label for="raca-pet" class="form-label">Raça do Pet</label>
            <input type="text" class="form-control" id="raca-pet" aria-describedby="racaHelp" name="racaPet">
            <div id="racaHelp" class="form-text"></div>
          </div>

          <div class="mb-3">
            <label for="observacao-pet" class="form-label">Observação do Pet</label>
            <textarea type="text" class="form-control" id="observacao-pet" aria-describedby="observacaoHelp" name="observacaoPet"></textarea>
            <div id="observacaoHelp" class="form-text"></div>
          </div>

          <div class="mb-3">
            <label for="id-clientePet" class="form-label">Cliente responsável</label>
            <select class="form-control" id="id-clientePet" aria-describedby="idClientePetHelp" name="idClientePet" required>
              <option value="" selected disabled>Selecione o dono</option>
              <?php
              while ($retorno = $objCliente->retornoBD->fetch_object()) {
                echo '<option value="' . $retorno->id_cliente . '">' . $retorno->nome_cliente . '</option>';
              }
              ?>
            </select>
            <div id="idClientePetHelp" class="form-text"></div>
          </div>

          <input type="hidden" name="formCadastrarPet">
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>

      </div>
    </div>
  </div>
<?php
} else {
  echo "<script>alert('Falha ao consultar no Banco de Dados!')</script>";
}
?>