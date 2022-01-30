<?php
include_once("../classes/Pet.php");
require "../login/autologin.php";
$objCliente = new Cliente();
$objCliente->selecionarClientes();
if ($objCliente->retornoBD != null) {
  $objPet = new Pet();
  if (isset($_GET['id'])) {
    $objPet->selecionarPorId($_GET['id']);
  }
  $retorno = $objPet->retornoBD->fetch_object();
?>

  <div class="container">
    <div class="row">
      <div class="col-10">
        <form method="POST" action="">

          <div class="mb-3">
            <label for="nome-pet" class="form-label">Nome do Pet</label>
            <input type="text" class="form-control" id="nome-pet" aria-describedby="nomeHelp" name="nomePet" value="<?php echo $retorno->nome_pet; ?>">
            <div id="nomeHelp" class="form-text"></div>
          </div>

          <div class="mb-3">
            <label for="raca-pet" class="form-label">Raça do Pet</label>
            <input type="text" class="form-control" id="raca-pet" aria-describedby="racaHelp" name="racaPet" value="<?php echo $retorno->raca_pet; ?>">
            <div id="racaHelp" class="form-text"></div>
          </div>

          <div class="mb-3">
            <label for="observacao-pet" class="form-label">Observação do Pet</label>
            <textarea type="text" class="form-control" id="observacao-pet" aria-describedby="observacaoHelp" name="observacaoPet"><?php echo $retorno->observacao_pet; ?></textarea>
            <div id="observacaoHelp" class="form-text"></div>
          </div>

          <div class="mb-3">

            <label for="id-clientePet" class="form-label">Cliente responsável</label>
            <select class="form-control" id="id-clientePet" aria-describedby="idClientePetHelp" name="idClientePet" value="<?php echo $retorno->id_cliente; ?>" required>
              <option value="" selected disabled>Selecione o dono</option>
              <?php
              while ($retornoCliente = $objCliente->retornoBD->fetch_object()) {
                echo '<option value="' . $retornoCliente->id_cliente . '">' . $retornoCliente->nome_cliente . '</option>';
              }
              ?>
            </select>
            <div id="idClientePetHelp" class="form-text"></div>
          </div>

          <input type="hidden" value="<?php echo $retorno->id_pet; ?>" name="idPet">
          <input type="hidden" name="formEditarPet">
          <button type="submit" class="btn btn-primary">Editar</button>
        </form>


      </div>
    </div>
  </div>
<?php
} else {
  echo "<script>alert('Falha ao consultar no Banco de Dados!')</script>";
}
?>