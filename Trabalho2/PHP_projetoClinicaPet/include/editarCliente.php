<?php
include_once("../classes/Cliente.php");
require "../login/autologin.php";
$objCliente = new Cliente();
if (isset($_GET['id'])) {
    $objCliente->selecionarPorId($_GET['id']);
}
$retorno = $objCliente->retornoBD->fetch_object();
?>

<div class="container">
    <div class="row">
        <div class="col-10">
            <form method="POST" action="">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email-cliente" aria-describedby="emailHelp" name="emailCliente" value="<?php echo $retorno->email_cliente; ?>">
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome-cliente" aria-describedby="nomeHelp" name="nomeCliente" value="<?php echo $retorno->nome_cliente; ?>">
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="cpf" class="form-label">CPF</label>
                    <input type="text" class="form-control" id="cpf-cliente" aria-describedby="cpfHelp" name="cpfCliente" value="<?php echo $retorno->cpf_cliente; ?>">
                    <div id="cpf" class="form-text"></div>
                </div>

                <input type="hidden" value="<?php echo $retorno->id_cliente; ?>" name="idCliente">
                <input type="hidden" name="formEditarCliente">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </div>
    </div>
</div>