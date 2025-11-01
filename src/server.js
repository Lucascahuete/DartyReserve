import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
	"/node_modules",
	express.static(path.join(__dirname, "../node_modules"))
);
app.use(express.static(__dirname)); // Sert index.html, admin.html, etc.

const produitPath = path.join(__dirname, "Experience/produit.js");

// Lecture du fichier produit.js
function lireProduits() {
	const data = fs.readFileSync(produitPath, "utf-8");
	const json = data.replace("export default", "").trim();
	return eval(json);
}

// Écriture dans produit.js
function ecrireProduits(produits) {
	const contenu = `export default ${JSON.stringify(produits, null, 2)};`;
	fs.writeFileSync(produitPath, contenu, "utf-8");
}

// === ROUTES API ===
app.get("/api/produits", (req, res) => {
	res.json(lireProduits());
});

app.get("/api/produits/:id", (req, res) => {
	const produits = lireProduits();
	res.json(produits[req.params.id]);
});

app.post("/api/produits", (req, res) => {
	const produits = lireProduits();
	produits.push(req.body);
	ecrireProduits(produits);
	res.json({ message: "Produit ajouté !" });
});

app.put("/api/produits/:id", (req, res) => {
	const produits = lireProduits();
	produits[req.params.id] = req.body;
	ecrireProduits(produits);
	res.json({ message: "Produit modifié !" });
});

app.delete("/api/produits/:id", (req, res) => {
	const produits = lireProduits();
	produits.splice(req.params.id, 1);
	ecrireProduits(produits);
	res.json({ message: "Produit supprimé !" });
});

app.listen(PORT, () => {
	console.log(`✅ Serveur en ligne sur le port ${PORT}`);
});
