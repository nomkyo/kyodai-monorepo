/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, type Locator } from "@playwright/test";

test("it loads the league schedule", async ({ page }) => {
	await page.goto(process.env["PAGE_URL"]!);

	await page.getByRole("button", { name: "search" }).click();

	const scheduleCells = await page
		.getByLabel("schedule-table")
		.getByRole("cell")
		.all();
	await expect(scheduleCells[0] as Locator).toBeVisible();
});
