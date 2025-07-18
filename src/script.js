import Experience from "./Experience/Experience";
import Produit from "./Experience/Produit";
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

for (const element of Produit) {
	const opt = document.createElement("option");
	opt.text = element.name;
	opt.value = element.rack;
	opt.value2 = element.floor;
	select.add(opt);
}

boutonChercher.addEventListener("click", clickChercher);
boutonNouvelleRecherche.addEventListener("click", clickNouvelleRecherche);

function clickChercher() {
	if (!select.value) {
		alert.classList.replace("hiden", "alert");
	} else {
		console.log(select.value2);
		experience.world.object.find(select.value);
		alert.classList.replace("alert", "hiden");
		nouvelleRecherche.classList.replace("hiden", "nouvelle-recherche");
		carreSelect.classList.replace("carre", "hiden");
	}
}

function clickNouvelleRecherche() {
	experience.world.object.updateColor();
	nouvelleRecherche.classList.replace("nouvelle-recherche", "hiden");
	carreSelect.classList.replace("hiden", "carre");
}
