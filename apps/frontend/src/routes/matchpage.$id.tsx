import { createFileRoute } from "@tanstack/react-router";
import { MatchPage } from "../pages/MatchPage";

export const Route = createFileRoute("/matchpage/$id")({
	component: MatchPage,
});
