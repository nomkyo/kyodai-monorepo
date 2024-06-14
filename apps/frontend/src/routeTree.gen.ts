/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignupImport } from "./routes/signup";
import { Route as MyaccountImport } from "./routes/myaccount";
import { Route as IndexImport } from "./routes/index";
import { Route as MatchpageIdImport } from "./routes/matchpage.$id";

// Create/Update Routes

const SignupRoute = SignupImport.update({
	path: "/signup",
	getParentRoute: () => rootRoute,
} as any);

const MyaccountRoute = MyaccountImport.update({
	path: "/myaccount",
	getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any);

const MatchpageIdRoute = MatchpageIdImport.update({
	path: "/matchpage/$id",
	getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			id: "/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexImport;
			parentRoute: typeof rootRoute;
		};
		"/myaccount": {
			id: "/myaccount";
			path: "/myaccount";
			fullPath: "/myaccount";
			preLoaderRoute: typeof MyaccountImport;
			parentRoute: typeof rootRoute;
		};
		"/signup": {
			id: "/signup";
			path: "/signup";
			fullPath: "/signup";
			preLoaderRoute: typeof SignupImport;
			parentRoute: typeof rootRoute;
		};
		"/matchpage/$id": {
			id: "/matchpage/$id";
			path: "/matchpage/$id";
			fullPath: "/matchpage/$id";
			preLoaderRoute: typeof MatchpageIdImport;
			parentRoute: typeof rootRoute;
		};
	}
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
	IndexRoute,
	MyaccountRoute,
	SignupRoute,
	MatchpageIdRoute,
});

/* prettier-ignore-end */
