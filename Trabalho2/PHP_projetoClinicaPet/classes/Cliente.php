<?php
include_once("../classes/Conexao.php");
include_once("../classes/Utilidades.php");
class Cliente
{

    private $id;
    private $email;
    private $nome;
    private $cpf;
    private $telefone;
    private $endereco;
    private $utilidades;

    public $retornoBD;
    public $conexaoBD;

    public function __construct()
    {
        $objConexao = new Conexao();
        $this->conexaoBD = $objConexao->getConexao();
        $this->utilidades = new Utilidades();
    }

    public function getId()
    {
        return $this->id;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getNome()
    {
        return $this->nome;
    }
    public function getCPF()
    {
        return $this->cpf;
    }
    public function getTelefone()
    {
        return $this->telefone;
    }
    public function getEndereco()
    {
        return $this->endereco;
    }

    public function setId($id)
    {
        //validacao
        return $this->id = $id;
    }
    public function setEmail($email)
    {
        //validacao
        return $this->email = $email;
    }
    public function setNome($nome)
    {
        //validacao
        return $this->nome =  mb_strtoupper($nome, 'UTF-8');
    }
    public function setCPF($cpf)
    {
        //validacao
        return $this->cpf = $cpf;
    }
    public function setTelefone($telefone)
    {
        //validacao
        return $this->telefone = $telefone;
    }
    public function setEndereco($endereco)
    {
        //validacao
        return $this->endereco = $endereco;
    }


    public function cadastrar()
    {
        if ($this->getCPF() != null) {

            $interacaoMySql = $this->conexaoBD->prepare("INSERT INTO cliente (nome_cliente, email_cliente, cpf_cliente, telefone_cliente, endereco_cliente) 
            VALUES (?, ?, ?, ?, ?)");
            $interacaoMySql->bind_param('sssss', $this->getNome(), $this->getEmail(), $this->getCPF(), $this->getTelefone(), $this->getEndereco());
            $retorno = $interacaoMySql->execute();

            $id = mysqli_insert_id($this->conexaoBD);

            return $this->utilidades->validaRedirecionar($retorno, $id, "admin.php?rota=visualizar_cliente", "O cliente foi cadastrado com sucesso!");
        } else {
            return $this->utilidades->mesagemParaUsuario("Erro, cadastro não realizado! CPF não foi infomado.");
        }
    }
    public function editar()
    {

        if ($this->getId() != null) {

            $interacaoMySql = $this->conexaoBD->prepare("UPDATE  cliente set  nome_cliente=?, email_cliente=?, cpf_cliente=?, telefone_cliente=?, endereco_cliente=?
            where id_cliente=?");
            $interacaoMySql->bind_param('sssssi', $this->getNome(), $this->getEmail(), $this->getCPF(), $this->getTelefone(), $this->getEndereco(), $this->getId());
            $retorno = $interacaoMySql->execute();
            if ($retorno === false) {
                trigger_error($this->conexaoBD->error, E_USER_ERROR);
            }

            $id = mysqli_insert_id($this->conexaoBD);

            return $this->utilidades->validaRedirecionar($retorno, $this->getId(), "admin.php?rota=visualizar_cliente", "Os dados do cliente foram alterados com sucesso!");
        } else {
            return $this->utilidades->mesagemParaUsuario("Erro! CPF não foi infomado.");
        }
    }

    public function selecionarPorId($id)
    {
        $sql = "select * from cliente where id_cliente=$id";
        $this->retornoBD = $this->conexaoBD->query($sql);
    }
    public function selecionarPorCPF($cpf)
    {
        $sql = "select * from cliente where cpf_cliente=$cpf";
        $this->retornoBD = $this->conexaoBD->query($sql);
    }
    public function selecionarClientes()
    {
        $sql = "select * from cliente order by data_cadastro_cliente DESC";
        $this->retornoBD = $this->conexaoBD->query($sql);
    }
    public function selecionarCliente($cliente)
    {
        $up_cliente = mb_strtoupper($cliente, 'UTF-8');
        $sql = "select * from cliente where nome_cliente='$up_cliente'";
        $this->retornoBD = $this->conexaoBD->query($sql);
    }

    public function deletar($id)
    {
        $sql = "DELETE from cliente where id_cliente=$id";
        $this->retornoBD = $this->conexaoBD->query($sql);
        $this->utilidades->validaRedirecionaAcaoDeletar($this->retornoBD, 'admin.php?rota=visualizar_cliente', 'O cliente foi deletado com sucesso!');
    }
}
