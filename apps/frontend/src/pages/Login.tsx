import { Title, Space } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { EmailForm } from "../components/ui/EmailForm";

export const Login = (): React.ReactElement => {
	const { t } = useTranslation();
	return (
		<div>
			<Title ta="center">{t("login")}</Title>
			<Space h="xl" />
			<EmailForm />
		</div>
	);
};
