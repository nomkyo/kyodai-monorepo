import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { api } from "../../../common/ky";
import type { Game, GameResponse } from "../types/Game";
import type { QueryConfig } from "../../../common/react-query";

export const useGame = (
	id: string,
	config?: QueryConfig<Game>
): UseQueryResult<Game> => {
	return useQuery({
		queryKey: ["games", id],
		queryFn: async (): Promise<Game> => {
			const response = await api
				.get(`games/${id}`)
				.json<GameResponse>();
        
        
			return {...response, startTime: new Date(response.startTime)};
		},
		...config,
	});
};
