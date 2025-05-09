const express = require("express");
const router = express.Router();
const produtoController = require("../controller/ProdutoController")

router.get("/produtos", produtoController.listarProdutos);
router.get("/produtos/:codigo", produtoController.buscarProduto);
router.get("/produtos/categoria/:categoria", produtoController.listarProdutosCategoria);
router.post("/produtos", produtoController.criarProduto);
router.put("/produtos/:codigo", produtoController.atualizarProduto);
router.delete("/produtos/:codigo", produtoController.deletarProduto);

module.exports = router;