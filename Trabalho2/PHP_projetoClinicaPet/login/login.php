<?php
include("../classes/Conexao.php");
include("../classes/Utilidades.php");

session_start();

if (isset($_POST['login'])) {
  $objConexao = new Conexao();
  $conexaoBD = $objConexao->getConexao();
  $utilidades = new Utilidades();

  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $sql = "select * from administrador where email_administrador='$email' and senha_administrador='$senha'";
  $retornoBD = $conexaoBD->query($sql);
  $total = @mysqli_num_rows($retornoBD);

  if (!$total) {
    $utilidades->redireciona("../index.html");
  } else {
    $_SESSION["administrador"] = true;
    $utilidades->redireciona("../produto/admin.php");
  }
}
