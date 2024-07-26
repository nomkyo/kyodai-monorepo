import { useForm } from "@mantine/form";
import {
	TextInput,
	Button,
	Container,
	Anchor,
	Title,
	Space,
} from "@mantine/core";
import { useRegister } from "../features/auth/lib/auth";
import { useTranslation } from "react-i18next";

interface FormValues {
	email: string;
}

export const Login = (): React.ReactElement => {
	const { t } = useTranslation();
	const form = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: { email: "" },
	});

	const registering = useRegister();

	return (
		<div>
			<Title ta="center">{t("login")}</Title>
			<Space h="xl"></Space>
			<form
				onSubmit={form.onSubmit((values) => {
					registering.mutate(values);
				})}
			>
				<Container maw="30rem" ta="center">
					<TextInput
						label={t("email")}
						placeholder={t("email")}
						key={form.key("email")}
						{...form.getInputProps("email")}
					/>
					<Space h="md"></Space>
					<Button type="submit" loading={registering.isPending}>
						{t("submit")}
					</Button>
					<Space h="lg"></Space>
					<Title order={4} ta="center">
						Or
					</Title>
					<Anchor href="/signup">{t("create-account")}</Anchor>
				</Container>
			</form>
		</div>
	);
};
