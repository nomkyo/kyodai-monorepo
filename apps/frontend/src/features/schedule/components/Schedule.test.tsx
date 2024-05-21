import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Schedule } from "./Schedule";
import { AllProviders } from "../../../common/__tests__/test-utils";
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
	render(<Schedule />, { wrapper: AllProviders });

	// Assert
	screen.debug()
	await waitFor(() => {
		expect(screen.getAllByRole("option")[0]).toBeInTheDocument();
	});
	expect(screen.getAllByRole("option")[0]).toHaveTextContent(
		expectedLeagues[0]!.title
	);
	expect(screen.getAllByRole("option")[1]).toHaveTextContent(
		expectedLeagues[1]!.title
	);
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

	render(<Schedule />, { wrapper: AllProviders });
	screen.debug()
	await waitFor(() => {
		expect(screen.getAllByRole("option")[0]).toBeInTheDocument();
	});
	fireEvent.change(screen.getAllByRole("combobox", { name: "League" })[0]!, {
		target: { value: expectedLeague!.key },
	});

	// Act
	fireEvent.click(screen.getAllByRole("button")[0]!);

	// Assert
	await waitFor(() => {
		expect(screen.getAllByRole("row")[0]).toBeInTheDocument();
	});
	expect(screen.getAllByRole("row")[0]).toHaveTextContent(
		`${expectedGames[0]?.awayTeam} @ ${expectedGames[0]?.homeTeam}`
	);
	expect(screen.getAllByRole("row")[1]).toHaveTextContent(
		`${expectedGames[1]?.awayTeam} @ ${expectedGames[1]?.homeTeam}`
	);
});
