import { createFileRoute } from "@tanstack/react-router";
import { MyAccount } from "../pages/MyAccount";

export const Route = createFileRoute('/myaccount')({
	component: MyAccount,
});
