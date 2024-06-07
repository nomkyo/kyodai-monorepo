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

export const MatchPage = (): React.ReactElement => {
	return (
		<div>
			<Grid>
				<Grid.Col span={5} ta="center">
					<Title order={1}>Denver Broncos</Title>
				</Grid.Col>
				<Grid.Col span={2} ta="center">
					<Title order={1}>@</Title>
				</Grid.Col>
				<Grid.Col span={5} ta="center">
					<Title order={1}>Washington Commanders</Title>
				</Grid.Col>
			</Grid>
			<br />
			<Container ta="center">
				<Title order={3}>10/11/24</Title>
				<br />
				<Title order={3}>10AM PST</Title>
			</Container>
			<Space h="lg" />
			<Space h="lg" />
			<Grid>
				<Grid.Col span={5}></Grid.Col>
				<Grid.Col span={1}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button>DEN (-3)</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									<NumberInput
										step={0.5}
										decimalScale={1}
										label={"Line"}
										size="lg"
									></NumberInput>
									<NumberInput
										allowNegative={false}
										allowDecimal={false}
										thousandSeparator=","
										step={25}
										label={"Bid"}
										size="lg"
										defaultValue={25}
									></NumberInput>
									<Space h="sm" />
									<Button>Create</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
				<Grid.Col span={0.5}></Grid.Col>
				<Grid.Col span={1}>
					<Popover
						width={200}
						trapFocus
						position="bottom"
						withArrow
						shadow="md"
					>
						<Popover.Target>
							<Button>WAS (+3)</Button>
						</Popover.Target>
						<Popover.Dropdown>
							<Flex maw="150" direction={"column"} ta="center">
								<Fieldset>
									<NumberInput
										step={0.5}
										decimalScale={1}
										label={"Line"}
										size="lg"
									></NumberInput>
									<NumberInput
										allowNegative={false}
										allowDecimal={false}
										thousandSeparator=","
										step={25}
										label={"Bid"}
										size="lg"
										defaultValue={25}
									></NumberInput>
									<Space h="sm" />
									<Button>Create</Button>
								</Fieldset>
							</Flex>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
			</Grid>
		</div>
	);
};
