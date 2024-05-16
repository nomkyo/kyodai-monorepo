import { QueryClient, type UseQueryOptions } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: true,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export type QueryConfig<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
