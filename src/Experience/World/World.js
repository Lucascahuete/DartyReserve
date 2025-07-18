import Experience from "../Experience";
import Environment from "./Environment";
import Object from "./Objects";
export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.ressources;

		this.resources.on("ready", () => {
			this.object = new Object();
			this.environment = new Environment();
		});
	}

	update() {
		if (this.object) {
			this.object.update();
		}
	}
}
