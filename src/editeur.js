import Produit from "./Experience/Produit";

const tbody = document.getElementById("tbody");
const form = document.getElementById("form");
const inputIndex = document.getElementById("index");
const inputName = document.getElementById("name");
const inputRack = document.getElementById("rack");
const btnCancel = document.getElementById("cancel");
const btnReset = document.getElementById("reset");
const btnExport = document.getElementById("export");

function loadProduits() {
	const stored = localStorage.getItem("produits");
	const base = stored ? JSON.parse(stored) : Produit;
	return base.map((p) => ({
		name: p.name ?? "",
		rack: p.rack ?? "",
	}));
}

let produits = loadProduits();

function saveProduits() {
	localStorage.setItem("produits", JSON.stringify(produits));
}

function rackToDisplay(rack) {
	if (Array.isArray(rack)) return rack.join(", ");
	return rack || "";
}

function parseRack(value) {
	const raw = (value || "").trim();
	if (!raw) return "";
	if (raw.includes(",")) {
		return raw
			.split(",")
			.map((s) => s.trim())
			.filter((s) => s.length > 0);
	}
	return raw;
}

function clearForm() {
	inputIndex.value = "";
	inputName.value = "";
	inputRack.value = "";
}

function fillForm(idx) {
	const item = produits[idx];
	inputIndex.value = idx;
	inputName.value = item.name;
	inputRack.value = rackToDisplay(item.rack);
}

function render() {
	tbody.innerHTML = "";
	produits
		.map((p, i) => ({ ...p, i }))
		.sort((a, b) => a.name.localeCompare(b.name))
		.forEach((p, rowIdx) => {
			const tr = document.createElement("tr");

			const tdIdx = document.createElement("td");
			tdIdx.textContent = String(rowIdx + 1);

			const tdName = document.createElement("td");
			tdName.textContent = p.name;

			const tdRack = document.createElement("td");
			tdRack.textContent = rackToDisplay(p.rack);

			const tdActions = document.createElement("td");
			const btnEdit = document.createElement("button");
			btnEdit.textContent = "Modifier";
			btnEdit.className = "btn-edit";
			btnEdit.addEventListener("click", () => {
				const origIndex = produits.findIndex(
					(x) =>
						x.name === p.name && rackToDisplay(x.rack) === rackToDisplay(p.rack)
				);
				if (origIndex >= 0) fillForm(origIndex);
			});

			const btnDelete = document.createElement("button");
			btnDelete.textContent = "Supprimer";
			btnDelete.className = "btn-delete";
			btnDelete.addEventListener("click", () => {
				const idx = produits.findIndex(
					(x) =>
						x.name === p.name && rackToDisplay(x.rack) === rackToDisplay(p.rack)
				);
				if (idx >= 0) {
					produits.splice(idx, 1);
					saveProduits();
					render();

					btnExport.addEventListener("click", () => {
						const data = JSON.stringify(produits, null, 2);
						const blob = new Blob([data], { type: "application/json" });
						const url = URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = `produits-${new Date()
							.toISOString()
							.slice(0, 19)
							.replace(/[:T]/g, "-")}.json`;
						document.body.appendChild(a);
						a.click();
						a.remove();
						URL.revokeObjectURL(url);
					});
					if (inputIndex.value && Number(inputIndex.value) === idx) clearForm();
				}
			});

			tdActions.appendChild(btnEdit);
			tdActions.appendChild(btnDelete);

			tr.appendChild(tdIdx);
			tr.appendChild(tdName);
			tr.appendChild(tdRack);
			tr.appendChild(tdActions);
			tbody.appendChild(tr);
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = inputName.value.trim();
	const rack = parseRack(inputRack.value);
	if (!name) return;

	const idx = inputIndex.value === "" ? -1 : Number(inputIndex.value);
	if (idx >= 0 && idx < produits.length) {
		produits[idx] = { name, rack };
	} else {
		produits.push({ name, rack });
	}
	saveProduits();
	render();
	clearForm();
});

btnCancel.addEventListener("click", () => {
	clearForm();
});

btnReset.addEventListener("click", () => {
	localStorage.removeItem("produits");
	produits = loadProduits();
	render();
	clearForm();
});

render();
