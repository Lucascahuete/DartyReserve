import Experience from "./Experience/Experience";
import Produit from "../static/Produit.js";
const storedProduits = localStorage.getItem("produits");
const ProduitsNormalized = (
	storedProduits ? JSON.parse(storedProduits) : Produit
).map((p) => ({
	name: p.name,
	rack: p.rack,
	color: p.color || 'red',
}));
const experience = new Experience(document.querySelector("canvas.webgl"));

const boutonChercher = document.querySelector("button.chercher");
const select = document.querySelector("select.chercher");
const carreSelect = document.querySelector("div.carre-selct");
carreSelect.className = "carre";
const alert = document.querySelector(".alert");
alert.className = "hiden";
const nouvelleRecherche = document.querySelector("div.nouvelle-recherche");
nouvelleRecherche.className = "hiden";
const boutonNouvelleRecherche = document.querySelector(
	"button.btn-nouvelle-recherche"
);
const btnConditions = document.getElementById("btn-conditions");
const btnFermerConditions = document.getElementById("btn-fermer-conditions");
const conditionsContainer = document.getElementById("conditions-container");

btnConditions.addEventListener("click", () => {
	conditionsContainer.classList.toggle("hidden");
});

btnFermerConditions.addEventListener("click", () => {
	conditionsContainer.classList.add("hidden");
});
ProduitsNormalized.sort((a, b) => a.name.localeCompare(b.name));
for (const element of ProduitsNormalized) {
	const opt = document.createElement("option");
	opt.text = element.name;
	opt.value = element.rack;
	opt.dataset.color = element.color;
	opt.value2 = element.floor;
	select.add(opt);
}

boutonChercher.addEventListener("click", clickChercher);
boutonNouvelleRecherche.addEventListener("click", clickNouvelleRecherche);

function clickChercher() {
	if (!select.value) {
		alert.classList.replace("hiden", "alert");
	} else {
		const selectedOption = select.options[select.selectedIndex];
		// Utiliser rouge par défaut si la couleur n'est pas définie
		const color = selectedOption.dataset.color || 'red';

		experience.world.object.find(select.value, color);
		alert.classList.replace("alert", "hiden");
		nouvelleRecherche.classList.replace("hiden", "nouvelle-recherche");
		carreSelect.classList.replace("carre", "hiden");

		// Afficher le pop-up avec les informations du produit
		document.getElementById("foundProductName").textContent =
			selectedOption.text;
		document.getElementById("foundProductRack").textContent =
			selectedOption.value;
		document.getElementById("productFoundPopup").classList.remove("hidden");
	}
}

function clickNouvelleRecherche() {
	experience.world.object.updateColor();
	nouvelleRecherche.classList.replace("nouvelle-recherche", "hiden");
	carreSelect.classList.replace("hiden", "carre");
	document.getElementById("productFoundPopup").classList.add("hidden");
}
