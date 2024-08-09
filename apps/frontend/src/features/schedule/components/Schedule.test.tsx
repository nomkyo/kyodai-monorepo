import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Schedule } from "./Schedule";
import { setupTest } from "../../../common/__tests__/test-utils";
import { handlers } from "../../../common/__tests__/api-handlers";
import {
	expectedGames,
	expectedLeagues,
} from "../../../common/__tests__/test-data";

const server = setupServer(...handlers);
beforeAll(() => {
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => {
	server.close();
});

it("loads the select league data", async () => {
	// Act
	setupTest(<Schedule />);

	// Assert
	const options = await screen.findAllByRole("option");
	screen.debug()
	expect(options[0]).toHaveTextContent(expectedLeagues[0]!.title);
	expect(options[1]).toHaveTextContent(expectedLeagues[1]!.title);
});

it("searches and displays the schedule for the selected league", async () => {
	const expectedLeague = expectedLeagues[1];
	server.use(
		http.get("schedule", ({ request }) => {
			const actualLeague = new URL(request.url).searchParams.get("league");
			const isExpectedLeague = actualLeague === expectedLeague!.key;
			const expectedResponse = HttpResponse.json(expectedGames);
			const errorResponse = new HttpResponse("Unexpected league", {
				status: 400,
			});

			return isExpectedLeague ? expectedResponse : errorResponse;
		})
	);

	const { user } = setupTest(<Schedule />);
	await screen.findAllByRole("option");
	await act(async () => {
		await user.selectOptions(
			screen.getAllByRole("combobox", { name: "League" })[0]!,
			expectedLeague!.key
		);
	});

	// Act
	await act(async () => {
		await user.click(screen.getAllByRole("button")[0]!);
	});

	// Assert
	const rows = await screen.findAllByRole("row");
	expect(rows[0]).toHaveTextContent(
		`${expectedGames[0]?.awayTeam.fullName} @ ${expectedGames[0]?.homeTeam.fullName}`
	);
	expect(rows[1]).toHaveTextContent(
		`${expectedGames[1]?.awayTeam.fullName} @ ${expectedGames[1]?.homeTeam.fullName}`
	);
});
