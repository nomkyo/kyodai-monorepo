import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import { queryClient } from "./common/react-query";
import type React from "react";
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): React.ReactElement => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{/* <TanStackRouterDevelopmentTools
				router={router}
				initialIsOpen={false}
				position="bottom-right"
			/> */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
