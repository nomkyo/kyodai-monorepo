import type { FullConfig } from "@playwright/test";
import "dotenv/config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalSetup(_config: FullConfig): void {
	console.log("setup tests");
}

export default globalSetup;
