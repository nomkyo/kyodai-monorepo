import { Accordion, Anchor, Box, Button, Center, Collapse, Flex, Grid, Group, rem, Space, Tabs, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconTicket, IconUserCircle } from "@tabler/icons-react";
import type React from "react";

export const MyAccount = (): React.ReactElement => {
	const iconStyle = { width: rem(12), height: rem(12) }; 	
	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center ">
			<Title ta="center">Account</Title>
			<Tabs variant="pills" defaultValue="tickets">
				<Tabs.List>
					<Tabs.Tab value="tickets" leftSection={<IconTicket style={iconStyle} />}>
						Tickets
					</Tabs.Tab>
					<Tabs.Tab value="profile" leftSection={<IconUserCircle style={iconStyle} />}>
						Profile
					</Tabs.Tab>
					<Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
						Settings
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tickets">
					
					<Accordion defaultValue="Open Tickets">
						<Accordion.Item key="Open Tickets" value="Open Tickets">
							<Accordion.Control>Open Tickets</Accordion.Control>
								<Accordion.Panel>
									<Box maw={400} bd="dashed" pb="10px">
									<Grid>
				<Grid.Col span={5} ta="center">
					<Title order={4}>Phoenix Suns</Title>
				</Grid.Col>
				<Grid.Col span={2} ta="center">
					<Title order={4}>@</Title>
				</Grid.Col>
				<Grid.Col span={5} ta="center">
					<Title order={4}>Los Angeles Clippers</Title>
				</Grid.Col>
			</Grid>
			<Title order={5} ta="center">11/11/2024 - 7:00 PM PST</Title>
			<Grid>
			<Grid.Col span={6} ta="center">Phoenix Suns +2
				<Space />
				50U to win 100U
			</Grid.Col>
			<Grid.Col span={6} ta="center">Status:<Space />
			<Button color="red">Cancel</Button>
			</Grid.Col>

			</Grid>
			
									</Box>
								</Accordion.Panel>
							
						</Accordion.Item>
						<Accordion.Item key="Closed Tickets" value="Closed Tickets">
							<Accordion.Control>Closed Tickets</Accordion.Control>
								<Accordion.Panel>
									Closed Tickets
								</Accordion.Panel>
							
						</Accordion.Item>
						<Accordion.Item key="History" value="History">
							<Accordion.Control>History</Accordion.Control>
								<Accordion.Panel>
									History
								</Accordion.Panel>
							
						</Accordion.Item>
					</Accordion>
				</Tabs.Panel>
				<Tabs.Panel value="profile">
				profile
				</Tabs.Panel>
				<Tabs.Panel value="settings">
				settings
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};
