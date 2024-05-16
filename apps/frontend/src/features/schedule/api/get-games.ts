import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { api } from "../../../common/ky";
import type { Game, GameResponse } from "../types/Game";
import type { QueryConfig } from "../../../common/react-query";

export const useGames = (
	league: string,
	config?: QueryConfig<Array<Game>>
): UseQueryResult<Array<Game>> => {
	return useQuery({
		queryKey: ["games", league],
		queryFn: async (): Promise<Array<Game>> => {
			const response = await api
				.get("schedule", { searchParams: { league } })
				.json<Array<GameResponse>>();
			return response.map((r) => ({ ...r, startTime: new Date(r.startTime) }));
		},
		...config,
	});
};
