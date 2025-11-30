import { ThreeMFLoader } from "three/examples/jsm/Addons.js";
import Experience from "../Experience";
import * as THREE from "three";

export default class Objects {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.ressources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;

		//Debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("fox ");
		}

		//setup
		this.resource = this.resources.item.reserveModel;

		this.basicColor = new THREE.MeshStandardMaterial({
			color: new THREE.Color("white"),
		});

		// Matériaux de couleur pour les différents racks
		this.colors = {
			red: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#f01111ff"), // Rouge vif
			}),
			yellow: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#fbde24ff"), // Jaune
			}),
			green: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#10b929ff"), // Vert
			}),
			blue: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#1e5ec6ff"), // Bleu
			}),
			purple: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#5936aaff"), // Violet (pour Sensible)
			}),
			white: new THREE.MeshStandardMaterial({
				color: new THREE.Color("#ffffff"), // Blanc par défaut
			}),
		};

		this.setModel();
		//this.setAnimation()
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.scale.set(0.2, 0.2, 0.2);
		this.scene.add(this.model);

		this.model.traverse((child) => {
			console.log(child);

			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
				child.material = this.basicColor;
				child.receiveShadow = true;
			}
		});
	}

	find(rac, color = "red") {
		if (typeof rac === "string") {
			rac = rac.split(","); // transforme "mesh_1,mesh_2" en ["mesh_1", "mesh_2"]
		}

		// Sélectionner le matériau en fonction de la couleur
		// Si la couleur n'existe pas ou est invalide, utiliser rouge par défaut
		const selectedMaterial =
			color && this.colors[color] ? this.colors[color] : this.colors.red;

		rac.forEach((element) => {
			element = element.trim(); // enlève les espaces éventuels
			this.model.traverse((child) => {
				if (child.name === element) {
					child.material = selectedMaterial;
				}
			});
		});
	}

	update() {
		//Update the model if needed
	}

	updateColor() {
		this.model.traverse((child) => {
			child.material = this.basicColor;
		});
	}
}
