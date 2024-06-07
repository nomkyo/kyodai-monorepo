import { Anchor, AppShell, Flex } from "@mantine/core";
import type React from "react";

export const AppLayout = ({
	app,
}: {
	app: React.ReactElement;
}): React.ReactElement => {
	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Flex
					mih={50}
					bg="rgba(0, 0, 0, .3)"
					gap="md"
					justify="flex-end"
					align="center"
					direction="row"
					wrap="wrap"
				>
					<Anchor href="/signin">Sign In</Anchor>
					<Anchor href="/myaccount">My Account</Anchor>
					<Anchor href="/">Home</Anchor>
				</Flex>
			</AppShell.Header>
			<AppShell.Main>{app}</AppShell.Main>
		</AppShell>
	);
};
