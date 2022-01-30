<?php
if (!isset($_SESSION)) {
  session_start();
}

// Verifica se foi feito login
if (!isset($_SESSION["administrador"])) {
  // Usuário não logado! Redireciona para a página de login
  header("location: ../index.html");
  exit;
}
