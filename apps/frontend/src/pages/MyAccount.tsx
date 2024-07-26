import {
	Accordion,
	Box,
	Button,
	Grid,
	rem,
	Space,
	Tabs,
	Title,
} from "@mantine/core";
import { IconSettings, IconTicket, IconUserCircle } from "@tabler/icons-react";
import type React from "react";
import { useTranslation } from "react-i18next";

export const MyAccount = (): React.ReactElement => {
	const iconStyle = { width: rem(12), height: rem(12) };
	const { t } = useTranslation();
	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center ">
			<Title ta="center">{t("account")}</Title>
			<Tabs variant="pills" defaultValue="tickets">
				<Tabs.List>
					<Tabs.Tab
						value="tickets"
						leftSection={<IconTicket style={iconStyle} />}
					>
						{t("tickets")}
					</Tabs.Tab>
					<Tabs.Tab
						value={t("profile")}
						leftSection={<IconUserCircle style={iconStyle} />}
					>
						{t("profile")}
					</Tabs.Tab>
					<Tabs.Tab
						value="settings"
						leftSection={<IconSettings style={iconStyle} />}
					>
						{t("settings")}
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tickets">
					<Accordion defaultValue="Open Tickets">
						<Accordion.Item key="Open Tickets" value="Open Tickets">
							<Accordion.Control>{t("open-tickets")}</Accordion.Control>
							<Accordion.Panel>
								<Box maw={400} bd="dashed" pb="10px">
									<Grid>
										<Grid.Col span={5} ta="center">
											<Title order={4}>Phoenix Suns</Title>
										</Grid.Col>
										<Grid.Col span={2} ta="center">
											<Title order={4}>{t("@")}</Title>
										</Grid.Col>
										<Grid.Col span={5} ta="center">
											<Title order={4}>Los Angeles Clippers</Title>
										</Grid.Col>
									</Grid>
									<Title order={5} ta="center">
										11/11/2024 - 7:00 PM PST
									</Title>
									<Grid>
										<Grid.Col span={6} ta="center">
											Phoenix Suns +2
											<Space />
											50U to win 100U
										</Grid.Col>
										<Grid.Col span={6} ta="center">
											{t("status")}
											<Space />
											<Button color="red">{t("cancel")}</Button>
										</Grid.Col>
									</Grid>
								</Box>
							</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key="Closed Tickets" value="Closed Tickets">
							<Accordion.Control>{t("closed-tickets")}</Accordion.Control>
							<Accordion.Panel>{t("closed-tickets")}</Accordion.Panel>
						</Accordion.Item>
						<Accordion.Item key="History" value="History">
							<Accordion.Control>{t("history")}</Accordion.Control>
							<Accordion.Panel>{t("history")}</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Tabs.Panel>
				<Tabs.Panel value="profile">{t("profile")}</Tabs.Panel>
				<Tabs.Panel value="settings">{t("settings")}</Tabs.Panel>
			</Tabs>
		</div>
	);
};
