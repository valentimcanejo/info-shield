require("dotenv").config();
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const rules = auth.rewriter({
  users: 600,
});

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);

app.get("/verify-token", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.decode(token);

  if (!decoded) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos

  if (decoded.exp && decoded.exp < currentTime) {
    return res.status(401).json({ message: "Token expirado" });
  }

  return res.status(200).json({ valid: true, decoded });
});

app.use(router);

app.listen(3001, () => {
  console.log("JSON Server rodando na porta 3001");
});
