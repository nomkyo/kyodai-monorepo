import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Anchor, Title, Space } from "@mantine/core";
import { useRegister } from "../features/auth/lib/auth";

interface FormValues {
	email: string;
}

export const Login = (): React.ReactElement => {
	const form = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: { email: ""},
	});

	const registering = useRegister();

	return (
        <div>
           <Title ta="center">Login</Title>
           <Space h="xl"></Space>
		<form
			onSubmit={form.onSubmit((values) => {
				registering.mutate(values);
			})}
		>
			<Container maw="30rem" ta="center">
				<TextInput
					label="Email"
					placeholder="Email"
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
                <Space h="md"></Space>
				<Button type="submit" loading={registering.isPending}>
					Submit
				</Button>
				<Space h="lg"></Space>
				<Title order={4} ta="center">Or</Title>
				<Anchor href="/signup">Create Account</Anchor>
			</Container>
		</form>
        </div>
	);
};
