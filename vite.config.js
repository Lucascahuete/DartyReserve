import { resolve } from "path";
import restart from "vite-plugin-restart";

export default {
	root: "src/", // Source files (where index.html and other HTML entries are)
	publicDir: "../static/", // Path from "root" to static assets
	server: {
		host: true, // Open to local network and display URL
		open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
	},
	build: {
		outDir: "../dist", // Output in the dist/ folder
		emptyOutDir: true, // Empty the folder first
		sourcemap: true, // Add sourcemap
		rollupOptions: {
			input: {
				index: resolve(__dirname, "src/index.html"),
				editeur: resolve(__dirname, "src/editeur.html"),
			},
		},
	},
	plugins: [
		restart({ restart: ["../static/**"] }), // Restart server on static file change
	],
};
