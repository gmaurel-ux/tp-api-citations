import express from "express";
import { fileURLToPath } from "node:url";

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.json());

const citations = [
  { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
];
let prochainId = 2;

app.get("/", (req, res) => {
  res.render("index", { citations });
});

app.get("/ping", (req, res) => {
  res.type("text/plain").send("Serveur de citations prêt.");
});

app.get("/citations", (req, res) => {
  res.json(citations);
});

const validerCitation = (corps) => {
  if (
    typeof corps?.texte !== "string" ||
    typeof corps?.auteur !== "string" ||
    corps.texte.trim() === "" ||
    corps.auteur.trim() === ""
  ) {
    return null;
  }

  return {
    texte: corps.texte.trim(),
    auteur: corps.auteur.trim(),
  };
};

app.get("/citations/:id", (req, res) => {
  const id = Number(req.params.id);
  const citation = citations.find((element) => element.id === id);

  if (!citation) {
    return res.status(404).json({ message: "Citation introuvable" });
  }

  res.json(citation);
});

app.post("/citations", (req, res) => {
  const validee = validerCitation(req.body);

  if (!validee) {
    return res
      .status(400)
      .json({ message: "texte et auteur doivent être des chaînes non vides" });
  }

  const citation = { id: prochainId, ...validee };
  prochainId += 1;
  citations.push(citation);

  res.status(201).json(citation);
});

app.put("/citations/:id", (req, res) => {
  const id = Number(req.params.id);
  const citation = citations.find((element) => element.id === id);

  if (!citation) {
    return res.status(404).json({ message: "Citation introuvable" });
  }

  const validee = validerCitation(req.body);

  if (!validee) {
    return res
      .status(400)
      .json({ message: "texte et auteur doivent être des chaînes non vides" });
  }

  citation.texte = validee.texte;
  citation.auteur = validee.auteur;

  res.json(citation);
});

app.delete("/citations/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = citations.findIndex((element) => element.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Citation introuvable" });
  }

  citations.splice(index, 1);

  res.status(204).end();
});

app.listen(3000, () => {
  console.log("API disponible sur http://localhost:3000");
});
