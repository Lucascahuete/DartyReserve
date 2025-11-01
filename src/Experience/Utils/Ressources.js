import EventEmitter from "./EventEmitter.js";
import * as THREE from "/node_modules/three/build/three.module.js";
import { GLTFLoader } from "/node_modules/three/examples/jsm/Addons.js";
export default class Ressources extends EventEmitter {
	constructor(sources) {
		super();

		//option
		this.sources = sources;

		//Setup

		this.item = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;

		this.setLoaders();

		this.startLoading();
	}

	setLoaders() {
		this.loaders = {};
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	startLoading() {
		/* load each source  */
		for (const source of this.sources) {
			if (source.type === "gltfModel") {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === "texture") {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === "cubeTexture") {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source, file) {
		this.item[source.name] = file;

		this.loaded++;
		if (this.loaded === this.toLoad) {
			this.trigger("ready");
		}
	}
}
