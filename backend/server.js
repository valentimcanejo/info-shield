const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

// Regras (opcional)
const rules = auth.rewriter({
  users: 600, // Somente o usuário dono pode acessar seus dados
});

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(3001, () => {
  console.log("JSON Server rodando na porta 3000");
});
