<?php
include_once("../classes/Pet.php");
require "../login/autologin.php";
$objCliente = new Cliente();
$objCliente->selecionarClientes();
if ($objCliente->retornoBD != null) {
?>

  <div style="display: flex; width: 100%; align-items: center; justify-content: center; flex-wrap: wrap;">

    <div class="col-lg-6" style="margin-bottom: 0.5rem;">
      <!-- Collapsable Card Example -->
      <div class="card shadow mb-8">
        <!-- Card Header - Accordion -->
        <a href="#collapseCardNome" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardNome">
          <h6 class="m-0 font-weight-bold text-primary">Pesquisar Pet por Nome</h6>
        </a>
        <!-- Card Content - Collapse -->
        <div class="collapse show" id="collapseCardNome">
          <div class="card-body">
            <form method="POST" action="">
              <div class="mb-3">
                <label for="nome-pet" class="form-label">Nome Pet (Nome completo)</label>
                <input type="text" class="form-control" id="nome-pet" aria-describedby="nomeHelp" name="nomePet" required>
                <div id="nomeHelp" class="form-text"></div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6" style="margin-bottom: 0.5rem;">
      <div class="card shadow mb-8">
        <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
          <h6 class="m-0 font-weight-bold text-primary">Pesquisar Pet por Cliente</h6>
        </a>

        <div class="collapse show" id="collapseCardExample">
          <div class="card-body">
            <form method="POST" action="">
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
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
  <form method="POST" action="" style="margin: 1rem;">
    <button type="submit" class="btn btn-primary" value="Listar Todos" name="todos">Listar Todos</button>
  </form>

  <?php
  $objPet = new Pet();
  $objPet->selecionarPorId(11);

  if (isset($_GET['id'])) {
    $objPet->selecionarPorId($_GET['id']);
  } else if (isset($_POST['idClientePet'])) {
    $objPet->selecionarPoridClientePet($_POST['idClientePet']);
  } else if (isset($_POST['nomePet'])) {
    $objPet->selecionarPet($_POST['nomePet']);
  } else {
    $objPet->selecionarPets();
  }

  if ($objPet->retornoBD != null) {
  ?>
    <br />
    <div class="row">
      <div class="col-12">
        <table class="table table-striped table-hover">
          <tr>
            <th width="5%">#</th>
            <th width="20%">Nome</th>
            <th width="20%">Raça</th>
            <th width="15%">Observação</th>
            <th width="20%">Cliente ID</th>
            <th width="10%">Editar</th>
            <th width="10%">Deletar</th>
          </tr>

          <?php

          while ($retorno = $objPet->retornoBD->fetch_object()) {
            echo '<tr>
                            <td>' . $retorno->id_pet . '</td><td>' .
              $retorno->nome_pet . '</td><td>' .
              $retorno->raca_pet . '</td><td>' .
              $retorno->observacao_pet . '</td><td>' .
              $retorno->id_cliente . '</td>';

            echo '<td>
                                <a href="?rota=editar_pet&id=' . $retorno->id_pet . '" class="btn btn-info btn-circle btn-sm">
                                    <i class="fas fa-list"></i>
                                </a> 
                            </td>';
            echo '<td>
                                <a href="#" class="btn btn-danger btn-circle btn-sm" onclick=\'deletarPet("' . $retorno->id_pet . '")\';><i class="fas fa-trash"></i></a></td></tr>';
          }

          ?>
        </table>
      </div>
    </div>
<?php
  }
} else {
  echo "<script>alert('Falha ao consultar no Banco de Dados!')</script>";
}
?>