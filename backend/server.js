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

const checkTokenExpiration = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ message: "Token expirado" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Erro ao decodificar token:", err.message);
    return res.status(500).json({ message: "Erro interno ao processar token" });
  }
};

app.get("/sections", checkTokenExpiration, (req, res) => {
  try {
    const sections = app.db.get("sections").value();
    console.log(sections);

    return res.status(200).json({
      message: "Seções carregadas com sucesso",
      user: req.user?.email,
      sections: sections,
    });
  } catch (err) {
    console.error("Erro ao buscar sections:", err.message);
    return res.status(500).json({ message: "Erro interno ao buscar sections" });
  }
});

app.get("/verify-token", checkTokenExpiration, (req, res) => {
  return res.status(200).json({ valid: true, decoded: req.user });
});

app.use(router);

app.listen(3001, () => {
  console.log("JSON Server rodando na porta 3001");
});
