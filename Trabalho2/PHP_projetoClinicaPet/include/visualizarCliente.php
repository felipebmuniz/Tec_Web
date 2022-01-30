<?php
include_once("../classes/Cliente.php");
require "../login/autologin.php";
?>

<div style="display: flex; width: 100%; align-items: center; justify-content: center; flex-wrap: wrap;">

    <div class="col-lg-6" style="margin-bottom: 0.5rem;">
        <!-- Collapsable Card Example -->
        <div class="card shadow mb-8">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary">Pesquisar Clientes por CPF</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardExample">
                <div class="card-body">
                    <form method="POST" action="">
                        <div class="mb-3">
                            <label for="cpf-cliente" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpf-cliente" aria-describedby="cpfHelp" name="cpfCliente" required>
                            <div id="cpfHelp" class="form-text"></div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>



    <div class="col-lg-6" style="margin-bottom: 0.5rem;">
        <!-- Collapsable Card Example -->
        <div class="card shadow mb-8">
            <!-- Card Header - Accordion -->
            <a href="#collapseCardNome" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardNome">
                <h6 class="m-0 font-weight-bold text-primary">Pesquisar Clientes por Nome</h6>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse show" id="collapseCardNome">
                <div class="card-body">
                    <form method="POST" action="">
                        <div class="mb-3">
                            <label for="nome-cliente" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome-cliente" aria-describedby="nomeHelp" name="nomeCliente" required>
                            <div id="nomeHelp" class="form-text"></div>
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
$objCliente = new Cliente();
$objCliente->selecionarPorId(11);

if (isset($_GET['id'])) {
    $objCliente->selecionarPorId($_GET['id']);
} else if (isset($_POST['cpfCliente'])) {
    $objCliente->selecionarPorCPF($_POST['cpfCliente']);
} else if (isset($_POST['nomeCliente'])) {
    $objCliente->selecionarCliente($_POST['nomeCliente']);
} else {
    $objCliente->selecionarClientes();
}

if ($objCliente->retornoBD != null) {
?>
    <br />
    <div class="row">
        <div class="col-12">
            <table class="table table-striped table-hover">
                <tr>
                    <th width="5%">#</th>
                    <th width="20%">Nome</th>
                    <th width="20%">Email</th>
                    <th width="15%">CPF</th>
                    <th width="20%">Telefone</th>
                    <th width="20%">Endereço</th>
                    <th width="10%">Editar</th>
                    <th width="10%">Deletar</th>
                </tr>

                <?php

                while ($retorno = $objCliente->retornoBD->fetch_object()) {
                    echo '<tr>
                            <td>' . $retorno->id_cliente . '</td><td>' .
                        $retorno->nome_cliente . '</td><td>' .
                        $retorno->email_cliente . '</td><td>' .
                        $retorno->cpf_cliente . '</td><td>' .
                        $retorno->telefone_cliente . '</td><td>' .
                        $retorno->endereco_cliente . '</td>';

                    echo '<td>
                                <a href="?rota=editar_cliente&id=' . $retorno->id_cliente . '" class="btn btn-info btn-circle btn-sm">
                                    <i class="fas fa-list"></i>
                                </a> 
                            </td>';
                    echo '<td>
                                <a href="#" class="btn btn-danger btn-circle btn-sm" onclick=\'deletarCliente("' . $retorno->id_cliente . '")\';><i class="fas fa-trash"></i></a></td></tr>';
                }

                ?>
            </table>
        </div>
    </div>
<?php
}
?>