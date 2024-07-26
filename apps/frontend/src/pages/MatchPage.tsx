import {
	Button,
	Container,
	Fieldset,
	Flex,
	Grid,
	NumberInput,
	Popover,
	Space,
	Title,
} from "@mantine/core";
import type React from "react";
import { Route } from "../routes/matchpage.$id";
import { useGame } from "../features/schedule/api/get-game";
import "../common/Number"
import { BidInput, LineInput } from "../components/ui/BetInput";

export const MatchPage = (): React.ReactElement => {
	const { id } = Route.useParams();
	const gameQuery = useGame(String(id));
	return (
		<div>
			<Grid>
				<Grid.Col span={5} ta="center">
					<Title order={1}>{gameQuery.data?.awayTeam.fullName}</Title>
				</Grid.Col>
				<Grid.Col span={2} ta="center">
					<Title order={1}>@</Title>
				</Grid.Col>
				<Grid.Col span={5} ta="center">
					<Title order={1}>{gameQuery.data?.homeTeam.fullName}</Title>
				</Grid.Col>
			</Grid>
			<Space h="lg" />
			<Container ta="center">
				<Title order={3}>
					{gameQuery.data?.startTime.toLocaleString([], {
						month: "numeric",
						day: "numeric",
						year: "numeric",
					})}
				</Title>
				<Space h="md" />
				<Title order={3}>
					{gameQuery.data?.startTime.toLocaleString([], {
						hour: "numeric",
						minute: "numeric",
						timeZoneName: "short",
					})}
				</Title>
			</Container>
			<Space h={50} />

			<Grid>
				<Grid.Col span={"auto"}></Grid.Col>
				<Grid.Col span={"content"}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button>{gameQuery.data?.awayTeam.code} ({(gameQuery.data?.awaySpread.positiveSign())})</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									{LineInput(gameQuery.data?.awaySpread, false)}
									{BidInput()}
									<Space h="sm" />
									<Button>Create</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				<Grid.Col span={1}></Grid.Col>
				<Grid.Col span={"content"}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button>{gameQuery.data?.homeTeam.code} ({gameQuery.data?.homeSpread.positiveSign()})</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									{LineInput(gameQuery.data?.homeSpread, false)}
									{BidInput()}
									<Space h="sm" />
									<Button>Create</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				<Grid.Col span={"auto"}></Grid.Col>
			</Grid>
			<Space h={300}></Space>
			<Title ta={"center"}>Instant Bets</Title>
			<Grid>
				<Grid.Col span={"auto"}></Grid.Col>
				<Grid.Col span={"content"}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button color="lime">DEN (-3)</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									<NumberInput
										step={0.5}
										decimalScale={1}
										disabled
										label="Line"
										size="lg"
									></NumberInput>
									{BidInput()}
									<Space h="sm" />
									<Button color="lime">Instant</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				<Grid.Col span={1}></Grid.Col>
				<Grid.Col span={"content"}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button color="lime">WAS (+3)</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									<NumberInput
										step={0.5}
										decimalScale={1}
										size="lg"
										disabled
										label="Line"
										defaultValue={-3}
									></NumberInput>
									{BidInput()}
									<Space h="sm" />
									<Button color="lime">Instant</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				<Grid.Col span={"auto"}></Grid.Col>
			</Grid>
		</div>
	);
};
