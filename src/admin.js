// admin.js
const liste = document.getElementById("liste");
const form = document.getElementById("produitForm");
const nomInput = document.getElementById("nom");
const rackInput = document.getElementById("rack");

async function chargerProduits() {
	const res = await fetch("/api/produits");
	const produits = await res.json();

	liste.innerHTML = "";
	produits.forEach((p, index) => {
		const li = document.createElement("li");
		li.innerHTML = `
      <strong>${p.name}</strong> — Racks : ${
			Array.isArray(p.rack) ? p.rack.join(", ") : p.rack
		}
      <button class="edit" data-index="${index}">Modifier</button>
      <button class="delete" data-index="${index}">Supprimer</button>
    `;
		liste.appendChild(li);
	});

	document.querySelectorAll(".edit").forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			const index = e.target.dataset.index;
			const res = await fetch(`/api/produits/${index}`);
			const produit = await res.json();
			nomInput.value = produit.name;
			rackInput.value = Array.isArray(produit.rack)
				? produit.rack.join(", ")
				: produit.rack;
			form.dataset.editIndex = index;
		});
	});

	document.querySelectorAll(".delete").forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			const index = e.target.dataset.index;
			await fetch(`/api/produits/${index}`, { method: "DELETE" });
			chargerProduits();
		});
	});
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const nom = nomInput.value.trim();
	const racks = rackInput.value
		.split(",")
		.map((r) => r.trim())
		.filter((r) => r);

	const produit = { name: nom, rack: racks.length === 1 ? racks[0] : racks };

	const editIndex = form.dataset.editIndex;
	if (editIndex !== undefined) {
		await fetch(`/api/produits/${editIndex}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(produit),
		});
		delete form.dataset.editIndex;
	} else {
		await fetch("/api/produits", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(produit),
		});
	}

	form.reset();
	chargerProduits();
});

chargerProduits();
