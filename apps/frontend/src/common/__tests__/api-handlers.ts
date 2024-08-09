import { http, HttpResponse } from "msw";
import { expectedGames, expectedLeagues } from "./test-data";

export const handlers = [
	http.get(process.env["VITE_API_BASE_URL"] + "/leagues", () => {
		return HttpResponse.json(expectedLeagues);
	}),
	http.get(process.env["VITE_API_BASE_URL"] + "/schedule", () => {
		return HttpResponse.json(expectedGames);
	}),
];
