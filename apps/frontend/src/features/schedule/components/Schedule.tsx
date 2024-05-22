import {
	ActionIcon,
	Flex,
	Table,
	Loader,
	useMantineTheme,
	NativeSelect,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useLeagues } from "../api/get-leagues";
import React, { useState } from "react";
import { useGames } from "../api/get-games";

export const Schedule = (): React.ReactElement => {
	const theme = useMantineTheme();
	const [league, setLeague] = useState("");
	const leaguesQuery = useLeagues();
	const gamesQuery = useGames(league, { enabled: false });
	React.useEffect(() => {
		if (leaguesQuery.data?.[0]?.key) {
			setLeague(leaguesQuery.data[0].key);
		}
	}, [leaguesQuery.data]);

	return (
		<div>
			<Flex align="flex-end" gap="sm">
				<NativeSelect
					label="League"
					value={league}
					onChange={(event) => {
						setLeague(event.currentTarget.value);
					}}
					data={leaguesQuery.data?.map((l) => ({
						value: l.key,
						label: l.title,
					}))}
				/>
				<ActionIcon
					onClick={() => {
						void gamesQuery.refetch();
					}}
				>
					{gamesQuery.isLoading ? (
						<Loader aria-label="loading" size="sm" color={theme.white} />
					) : (
						<IconSearch aria-label="search" stroke="2" />
					)}
				</ActionIcon>
			</Flex>
			<Table aria-label="schedule-table">
				<Table.Tbody>
					{gamesQuery.data?.map((game) => (
						<Table.Tr key={game.id}>
							<Table.Td>
								{game.startTime.toLocaleString([], {
									month: "numeric",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
									timeZoneName: "short",
								})}
							</Table.Td>
							<Table.Td>{`${game.awayTeam} @ ${game.homeTeam}`}</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</div>
	);
};
