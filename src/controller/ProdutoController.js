const { getConnection } = require("../services/dbConfig");
const sql = require("mssql");

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Produto");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar produtos", detalhes: error.message });
  }
};

// Buscar produto por código
exports.buscarProduto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("codigo", sql.VarChar(10), codigo)
      .query("SELECT * FROM Produto WHERE Codigo = @codigo");

    if (result.recordset.length === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produto", detalhes: error.message });
  }
};

// Criar novo produto
exports.criarProduto = async (req, res) => {
  const { nome, codigo, preco, descricao, estoque, avaliacao, categoria } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("nome", sql.VarChar(50), nome)
      .input("codigo", sql.VarChar(10), codigo)
      .input("preco", sql.Float, preco)
      .input("descricao", sql.VarChar(300), descricao)
      .input("estoque", sql.Int, estoque)
      .input("avaliacao", sql.Float, avaliacao)
      .input("categoria", sql.VarChar(50), categoria)
      .query(`
        INSERT INTO Produto (Nome, Codigo, Preco, Descricao, Estoque, Avaliacao, Categoria)
        VALUES (@nome, @codigo, @preco, @descricao, @estoque, @avaliacao, @categoria)
      `);

    res.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar produto", detalhes: error.message });
  }
};

// Atualizar produto existente
exports.atualizarProduto = async (req, res) => {
  const { codigo } = req.params;
  const { nome, preco, descricao, estoque, avaliacao, categoria } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("codigo", sql.VarChar(10), codigo)
      .input("nome", sql.VarChar(50), nome)
      .input("preco", sql.Float, preco)
      .input("descricao", sql.VarChar(300), descricao)
      .input("estoque", sql.Int, estoque)
      .input("avaliacao", sql.Float, avaliacao)
      .input("categoria", sql.VarChar(50), categoria)
      .query(`
        UPDATE Produto
        SET Nome = @nome,
            Preco = @preco,
            Descricao = @descricao,
            Estoque = @estoque,
            Avaliacao = @avaliacao,
            Categoria = @categoria
        WHERE Codigo = @codigo
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado para atualizar" });
    }

    res.json({ mensagem: "Produto atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto", detalhes: error.message });
  }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
  const { codigo } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("codigo", sql.VarChar(10), codigo)
      .query("DELETE FROM Produto WHERE Codigo = @codigo");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado para deletar" });
    }

    res.json({ mensagem: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar produto", detalhes: error.message });
  }
};


exports.listarProdutosCategoria = async (req, res) => {
  const { categoria } = req.params;
  try{
    const pool = await getConnection();
    const result = await pool.request()
      .input("categoria", sql.VarChar(50), categoria)
      .query("SELECT * FROM Produto WHERE Categoria = @categoria");

      
    if (result.recordset.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum produto dessa categoria foi encontrado" });
    }
    res.json(result.recordset);
  } catch(error){
    res.status(500).json({ erro: "Erro ao tentar listar produtos por categoria", detalhes: error.mesage})    
  }

}

exports.listarPrimeirosProdutos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query("SELECT TOP 12 * FROM Produto ORDER BY Codigo");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar os primeiros produtos", detalhes: error.message });
  }
};