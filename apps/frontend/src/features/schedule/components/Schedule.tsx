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
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

export const Schedule = (): React.ReactElement => {
	const { t } = useTranslation();
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
					label={t("league")}
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
						<Loader aria-label={t("loading")} size="sm" color={theme.white} />
					) : (
						<IconSearch aria-label={t("search")} stroke="2" />
					)}
				</ActionIcon>
			</Flex>
			<Table aria-label={t("schedule-table")}>
				<Table.Tbody>
					{gamesQuery.data?.map((game) => (
						<Table.Tr key={game.id}>
							<Link to={"/matchpage/$id"} params={{ id: game.id }}>
								<Table.Td>
									{game.startTime.toLocaleString([], {
										month: "numeric",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										timeZoneName: "short",
									})}
								</Table.Td>
								<Table.Td>{`${game.awayTeam.fullName} @ ${game.homeTeam.fullName}`}</Table.Td>
							</Link>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</div>
	);
};
