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

		this.selectColor = new THREE.MeshStandardMaterial({
			color: new THREE.Color("red"),
		});

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

	find(rac) {
		if (typeof rac === "string") {
			rac = rac.split(","); // transforme "mesh_1,mesh_2" en ["mesh_1", "mesh_2"]
		}

		rac.forEach((element) => {
			element = element.trim(); // enlève les espaces éventuels
			this.model.traverse((child) => {
				if (child.name === element) {
					child.material = this.selectColor;
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
