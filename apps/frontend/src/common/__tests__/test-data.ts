import { faker } from "@faker-js/faker";
import type { GameResponse } from "../../features/schedule/types/Game";
import type { League } from "../../features/schedule/types/League";

export const expectedLeagues: Array<League> = [
	{
		key: "mlb_baseball",
		group: "Baseball",
		title: "MLB",
		description: "MLB Baseball",
		active: true,
	},
	{
		key: "nba_basketball",
		group: "Basketball",
		title: "NBA",
		description: "NBA Basketball",
		active: true,
	},
];
export const expectedGames: Array<GameResponse> = [
	{
		id: faker.string.alphanumeric(),
		homeTeam: {
			code: "ARI",
			name: "Cardinals",
			fullName: "Arizona Cardinals",
		},
		awayTeam: {
			code: "ATL",
			name: "Falcons",
			fullName: "Atlanta Falcons",
		},
		homeSpread: 1.2,
		awaySpread: -1.2,
		startTime: faker.date.soon().toISOString(),
	},
	{
		id: faker.string.alphanumeric(),
		homeTeam: {
			code: "BUF",
			name: "Bills",
			fullName: "Buffalo Bills",
		},
		awayTeam: {
			code: "CAR",
			name: "Panthers",
			fullName: "Carolina Panthers",
		},
		homeSpread: 1.5,
		awaySpread: -1.5,
		startTime: faker.date.soon().toISOString(),
	},
];
