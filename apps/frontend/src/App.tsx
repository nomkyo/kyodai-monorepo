import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type React from "react";
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): React.ReactElement => {
	return (
		<div>
			<RouterProvider router={router} />
			{/* <TanStackRouterDevelopmentTools
				router={router}
				initialIsOpen={false}
				position="bottom-right"
			/> */}
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
