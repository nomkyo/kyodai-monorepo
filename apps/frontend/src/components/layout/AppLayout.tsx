import { Anchor, AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type React from "react";
import { useLeagues } from "../../features/schedule/api/get-leagues";
import { useTranslation } from "react-i18next";

export const AppLayout = ({
	app,
}: {
	app: React.ReactElement;
}): React.ReactElement => {
	const [opened, { toggle }] = useDisclosure();
	const { t } = useTranslation();
	const leaguesQuery = useLeagues();
	return (
		<AppShell
			header={{ height: 60 }}
			padding="md"
			navbar={{
				width: 200,
				breakpoint: "sm",
				collapsed: { desktop: opened, mobile: !opened },
			}}
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} />
					<Group justify="space-between" style={{ flex: 1 }}>
						{t("nk")}
						<Group ml="xl" gap={10} align="right">
							<Anchor href="/login">{t("login")}</Anchor>
							<Anchor href="/myaccount">{t("account")}</Anchor>
							<Anchor href="/">{t("home")}</Anchor>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar py="md" px={4}>
				{leaguesQuery.data?.map((league) => (
					<Container>{league.title}</Container>
				))}
			</AppShell.Navbar>
			<AppShell.Main>{app}</AppShell.Main>
		</AppShell>
	);
};
