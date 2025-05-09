const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const produtoRoutes = require("./routes/ProdutoRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
