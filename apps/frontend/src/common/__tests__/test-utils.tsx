/* eslint-disable react-refresh/only-export-components */
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../router";
import { type RenderResult, act, render } from "@testing-library/react";
import { type UserEvent, userEvent } from "@testing-library/user-event";
import "../i18n";

export const AllProviders = ({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement => {
	return (
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>

				{children}
			</QueryClientProvider>
		</MantineProvider>
	);
};

export function setupTest(
	component: React.ReactElement
): { view: RenderResult } & { user: UserEvent } {
	let view: RenderResult;
	// eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		view = render(component, { wrapper: AllProviders });
	});
	return {
		view: view!,
		user: userEvent.setup(),
	};
}
