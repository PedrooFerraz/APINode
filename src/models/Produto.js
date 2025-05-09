class Produto {
    constructor(nome, codigo, preco, descricao, estoque, avaliacao, categoria) {
      this.nome = nome;
      this.codigo = codigo;
      this.preco = preco;
      this.descricao = descricao;
      this.estoque = estoque;
      this.avaliacao = avaliacao;
      this.categoria = categoria;
    }
  }
  
  module.exports = Produto;