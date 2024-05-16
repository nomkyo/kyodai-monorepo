import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../router";
import type { FunctionComponent } from "../types";

export const AllProviders = ({
	children,
}: {
	children: React.ReactNode;
}): FunctionComponent => {
	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>

				{children}
			</QueryClientProvider>
		</MantineProvider>
	);
};
