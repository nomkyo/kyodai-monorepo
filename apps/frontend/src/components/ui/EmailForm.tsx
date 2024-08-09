import { Container, TextInput, Space, Checkbox, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconMailFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useRegister } from "../../features/auth/api/auth";

interface FormValues {
	email: string;
}
export const EmailForm = (): React.ReactElement => {
	const { t } = useTranslation();
    const isValid = ()=>{
        if(form.isValid()){
            return(
            notifications.show({
                icon: mailIcon,
                title: t("email-sent"),
                message: t("magiclink-sent-msg")
		})
	)}
	else{
		return null
	}
}
	
	const mailIcon= <IconMailFilled /> 
	const form = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: { email: "" },
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		  },
	});
	const registering = useRegister();
	return (
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
					<Space h="sm" />
					<Checkbox label={t('remember-me')} />
					<Space h="md" />
						<Button type="submit" onClick={isValid}>
						{t("submit")}
					</Button>
					<Space h="sm" />
					<Text>{t('magiclink-msg')}</Text>
				</Container>
			</form>
    )}