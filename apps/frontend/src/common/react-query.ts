import { QueryCache, QueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { notifications } from '@mantine/notifications';

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
    onError: (error) => {
      notifications.show({
				title: error.name,
				message: error.message,
				color: 'red',
			});
    }
  }),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export type QueryConfig<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
