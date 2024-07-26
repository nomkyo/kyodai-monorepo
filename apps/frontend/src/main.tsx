import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./common/i18n.ts";
import { router } from "./common/router.tsx";
import { Notifications } from "@mantine/notifications";
import { AppLayout } from "./components/layout/AppLayout.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./common/react-query.ts";

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}
const theme = createTheme({
	breakpoints: {
		xs: "30em",
		sm: "48em",
		md: "64em",
		lg: "74em",
		xl: "90em",
	},
});
const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<Notifications />
					<AppLayout app={<App router={router} />} />
				</MantineProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
}
