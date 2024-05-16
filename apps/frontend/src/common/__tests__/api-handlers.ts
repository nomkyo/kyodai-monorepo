import { http, HttpResponse } from "msw";
import { expectedGames, expectedLeagues } from "./test-data";

export const handlers = [
	http.get("leagues", () => {
		return HttpResponse.json(expectedLeagues);
	}),
	http.get("schedule", () => {
		return HttpResponse.json(expectedGames);
	}),
];
