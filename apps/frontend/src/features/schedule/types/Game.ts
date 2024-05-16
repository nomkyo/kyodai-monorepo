export type GameBase = {
	id: string;
	homeTeam: string;
	awayTeam: string;
	homeSpread: number;
	awaySpread: number;
};

export type GameResponse = GameBase & {
	startTime: string;
};

export type Game = GameBase & {
	startTime: Date;
};
