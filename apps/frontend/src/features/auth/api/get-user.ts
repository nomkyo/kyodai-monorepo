import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueryConfig } from "../../../common/react-query";
import { UserResponse } from "../types/User";
import { api } from "../../../common/ky";

export const useUser = (
    config?: QueryConfig<UserResponse>
): UseQueryResult<UserResponse> => {
    return useQuery({
        queryKey: ["auth/me"],
        queryFn: async (): Promise<UserResponse> => {
            return api.get("auth/me", { credentials: "include" }).json();
        },
        ...config,
    });
};