import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { api } from "../../../common/ky";
import type { League } from "../types/League";
import type { QueryConfig } from "../../../common/react-query";

export const useLeagues = (
	config?: QueryConfig<Array<League>>
): UseQueryResult<Array<League>> => {
	return useQuery({
		queryKey: ["leagues"],
		queryFn: async (): Promise<Array<League>> => {
			return api.get("leagues").json();
		},
		...config,
	});
};
