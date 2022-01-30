<?php
include_once("../classes/Cliente.php");
include_once("../classes/Pet.php");

if (isset($_POST['idClienteDeletar'])) {
    $objCliente = new Cliente();
    $objCliente->deletar($_POST['idClienteDeletar']);
} else if (isset($_POST['idPetDeletar'])) {
    $objPet = new Pet();
    $objPet->deletar($_POST['idPetDeletar']);
}
