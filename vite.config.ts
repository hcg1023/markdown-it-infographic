import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: 'happy-dom',
		forceRerunTriggers: [...configDefaults.forceRerunTriggers, "test/**"],
	},
});
