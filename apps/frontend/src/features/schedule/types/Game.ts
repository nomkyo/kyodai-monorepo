import type { Team } from "./Team";

export type GameBase = {
	id: string;
	homeTeam: Team;
	awayTeam: Team;
	homeSpread: number;
	awaySpread: number;
};

export type GameResponse = GameBase & {
	startTime: string;
};

export type Game = GameBase & {
	startTime: Date;
};
