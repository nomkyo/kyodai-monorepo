import { Anchor, AppShell, Burger, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type React from "react";

export const AppLayout = ({
	app,
}: {
	app: React.ReactElement;
}): React.ReactElement => {
	const [opened, { toggle }] = useDisclosure();
	return (
		<AppShell 
		header={{ height: 60 }} 
		padding="md"
		navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: opened, mobile: !opened } }}
		>
			<AppShell.Header>
			<Group h="100%" px="md">
			<Burger opened={opened} onClick={toggle} />
			<Group justify="space-between" style={{ flex: 1 }}>
			NK
			<Group ml="xl" gap={10} align="right">
					<Anchor href="/signin">Sign In</Anchor>
					<Anchor href="/myaccount">My Account</Anchor>
					<Anchor href="/">Home</Anchor>
				</Group>
				</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar py="md" px={4}>
				</AppShell.Navbar>
			<AppShell.Main>{app}</AppShell.Main>
		</AppShell>
	);
};
