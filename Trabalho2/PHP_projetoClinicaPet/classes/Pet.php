<?php
include_once("../classes/Conexao.php");
include_once("../classes/Utilidades.php");
class Pet
{

  private $id;
  private $nome;
  private $raca;
  private $observacao;
  private $idCliente;
  private $utilidades;

  public $retornoBD;
  public $conexaoBD;

  public function __construct()
  {
    $objConexaoPet = new Conexao();
    $this->conexaoBD = $objConexaoPet->getConexao();
    $this->utilidades = new Utilidades();
  }

  public function getId()
  {
    return $this->id;
  }
  public function getNome()
  {
    return $this->nome;
  }
  public function getRaca()
  {
    return $this->raca;
  }
  public function getObservacao()
  {
    return $this->observacao;
  }
  public function getIdCliente()
  {
    return $this->idCliente;
  }

  public function setId($id)
  {
    //validacao
    return $this->id = $id;
  }
  public function setNome($nome)
  {
    //validacao
    return $this->nome =  mb_strtoupper($nome, 'UTF-8');
  }
  public function setRaca($raca)
  {
    //validacao
    return $this->raca = $raca;
  }
  public function setObservacao($observacao)
  {
    //validacao
    return $this->observacao = $observacao;
  }
  public function setIdCliente($idCliente)
  {
    //validacao
    return $this->idCliente = $idCliente;
  }


  public function cadastrar()
  {
    if ($this->getIdCliente() != null) {

      $interacaoMySql = $this->conexaoBD->prepare("INSERT INTO pet (nome_pet, raca_pet, observacao_pet, id_cliente) 
            VALUES (?, ?, ?, ?)");
      $interacaoMySql->bind_param('sssi', $this->getNome(), $this->getRaca(), $this->getObservacao(), $this->getIdCliente());
      $retorno = $interacaoMySql->execute();

      $id = mysqli_insert_id($this->conexaoBD);

      return $this->utilidades->validaRedirecionar($retorno, $id, "admin.php?rota=visualizar_pet", "O Pet foi cadastrado com sucesso!");
    } else {
      return $this->utilidades->mesagemParaUsuario("Erro, cadastro não realizado! Cliente não foi infomado.");
    }
  }
  public function editar()
  {

    if ($this->getId() != null) {

      $interacaoMySql = $this->conexaoBD->prepare("UPDATE pet set  nome_pet=?, raca_pet=?, observacao_pet=?, id_cliente=?
            where id_pet=?");
      $interacaoMySql->bind_param('sssii', $this->getNome(), $this->getRaca(), $this->getObservacao(), $this->getIdCliente(), $this->getId());
      $retorno = $interacaoMySql->execute();
      if ($retorno === false) {
        trigger_error($this->conexaoBD->error, E_USER_ERROR);
      }

      $id = mysqli_insert_id($this->conexaoBD);

      return $this->utilidades->validaRedirecionar($retorno, $this->getId(), "admin.php?rota=visualizar_pet", "Os dados do Pet foram alterados com sucesso!");
    } else {
      return $this->utilidades->mesagemParaUsuario("Erro! Cliente não foi infomado.");
    }
  }

  public function selecionarPorId($id)
  {
    $sql = "select * from pet where id_pet=$id";
    $this->retornoBD = $this->conexaoBD->query($sql);
  }
  public function selecionarPoridClientePet($idCliente)
  {
    $sql = "select * from pet where id_cliente=$idCliente";
    $this->retornoBD = $this->conexaoBD->query($sql);
  }
  public function selecionarPets()
  {
    $sql = "select * from pet order by data_cadastro_pet DESC";
    $this->retornoBD = $this->conexaoBD->query($sql);
  }
  public function selecionarPet($pet)
  {
    $up_pet = mb_strtoupper($pet, 'UTF-8');
    $sql = "select * from pet where nome_pet='$up_pet'";
    $this->retornoBD = $this->conexaoBD->query($sql);
  }

  public function deletar($id)
  {
    $sql = "DELETE from pet where id_pet=$id";
    $this->retornoBD = $this->conexaoBD->query($sql);
    $this->utilidades->validaRedirecionaAcaoDeletar($this->retornoBD, 'admin.php?rota=visualizar_pet', 'O pet foi deletado com sucesso!');
  }
}
