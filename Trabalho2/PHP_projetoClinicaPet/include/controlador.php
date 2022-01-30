<?php
include_once("../classes/Cliente.php");
include_once("../classes/Pet.php");
//Get
if (isset($_GET['rota'])) {
    switch ($_GET['rota']) {
        case "cadastrar_cliente":
            include("../include/cadastrarCliente.php");
            break;

        case "visualizar_cliente":
            include("../include/visualizarCliente.php");
            break;

        case "editar_cliente":
            include("../include/editarCliente.php");
            break;
        case "cadastrar_pet":
            include("../include/cadastrarPet.php");
            break;

        case "visualizar_pet":
            include("../include/visualizarPet.php");
            break;

        case "editar_pet":
            include("../include/editarPet.php");
            break;

        case "dashboard":
            include("../include/dashboard.php");
            break;
    }
}


//Post
if (isset($_POST['formCadastrarCliente'])) {
    $objCliente = new Cliente();
    $objCliente->setEmail($_POST['emailCliente']);
    $objCliente->setNome($_POST['nomeCliente']);
    $objCliente->setCPF($_POST['cpfCliente']);
    $objCliente->setTelefone($_POST['telefoneCliente']);
    $objCliente->setEndereco($_POST['enderecoCliente']);
    $objCliente->cadastrar();
} else if (isset($_POST['formEditarCliente'])) {
    $objCliente = new Cliente();
    $objCliente->setID($_POST['idCliente']);
    $objCliente->setEmail($_POST['emailCliente']);
    $objCliente->setNome($_POST['nomeCliente']);
    $objCliente->setCPF($_POST['cpfCliente']);
    $objCliente->setTelefone($_POST['telefoneCliente']);
    $objCliente->setEndereco($_POST['enderecoCliente']);
    $objCliente->editar();
} else if (isset($_POST['formCadastrarPet'])) {
    $objPet = new Pet();
    $objPet->setID($_POST['idPet']);
    $objPet->setNome($_POST['nomePet']);
    $objPet->setRaca($_POST['racaPet']);
    $objPet->setObservacao($_POST['observacaoPet']);
    $objPet->setIdCliente($_POST['idClientePet']);
    $objPet->cadastrar();
} else if (isset($_POST['formEditarPet'])) {
    $objPet = new Pet();
    $objPet->setID($_POST['idPet']);
    $objPet->setNome($_POST['nomePet']);
    $objPet->setRaca($_POST['racaPet']);
    $objPet->setObservacao($_POST['observacaoPet']);
    $objPet->setIdCliente($_POST['idClientePet']);
    $objPet->editar();
}
