<?php
require "../login/autologin.php";
?>

<div class="container">
    <div class="row">
        <div class="col-10">
            <form method="POST" action="">
                <div class="mb-3">
                    <label for="email-cliente" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email-cliente" aria-describedby="emailHelp" name="emailCliente">
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="nome-cliente" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome-cliente" aria-describedby="nomeHelp" name="nomeCliente">
                    <div id="nomeHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="cpf-cliente" class="form-label">CPF</label>
                    <input type="text" class="form-control" id="cpf-cliente" aria-describedby="cpfHelp" name="cpfCliente" required>
                    <div id="cpfHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="telefone-cliente" class="form-label">Telefone</label>
                    <input type="text" class="form-control" id="telefone-cliente" aria-describedby="telefoneHelp" name="telefoneCliente">
                    <div id="telefoneHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="endereco-cliente" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="endereco-cliente" aria-describedby="enderecoHelp" name="enderecoCliente">
                    <div id="enderecoHelp" class="form-text"></div>
                </div>

                <input type="hidden" name="formCadastrarCliente">
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
    </div>
</div>