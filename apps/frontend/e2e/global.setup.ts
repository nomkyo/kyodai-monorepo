import type { FullConfig } from "@playwright/test";
import dotenv from "dotenv";
import { dirname } from "./env";

dotenv.config({ path: `${dirname}/.env.${process.env["NODE_ENV"]}` });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalSetup(_config: FullConfig): void {
	console.log("setup tests");
}

export default globalSetup;
