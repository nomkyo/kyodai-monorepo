import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Anchor } from "@mantine/core";
import { useRegister } from "../features/auth/lib/auth";

interface FormValues {
	email: string;
	password: string;
}

export const SignUp = (): React.ReactElement => {
	const form = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: { email: "", password: "" },
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
					label="Email"
					placeholder="Email"
					key={form.key("email")}
					{...form.getInputProps("email")}
				/>
				<TextInput
					label="Password"
					placeholder="Password"
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<Button type="submit" loading={registering.isPending}>
					Submit
				</Button>
				<br />
				<Anchor href="/login">Already have an account?</Anchor>
			</Container>
		</form>
	);
};
