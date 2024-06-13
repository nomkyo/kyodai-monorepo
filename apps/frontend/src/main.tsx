import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./common/i18n.ts";
import { router } from "./common/router.tsx";
import { Notifications } from "@mantine/notifications";
import { AppLayout } from "./components/layout/AppLayout.tsx";

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<MantineProvider>
				<Notifications />
				<AppLayout app={<App router={router} />} />
			</MantineProvider>
		</React.StrictMode>
	);
}
