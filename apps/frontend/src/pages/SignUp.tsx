import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Anchor } from "@mantine/core";
import { useRegister } from "../features/auth/lib/auth";
import { api } from "../common/ky";

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
	const signout = async () => {
		await api.post("signout", {credentials: "include"});
	};
	const me = async () => {
		const response = await api.get("supa-me", { credentials: "include" }).json();
		console.log(response);
	};
	return (
		<>
			<Button onClick={signout}>Sign Out</Button>
			<Button onClick={me}>me</Button>
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
					<Anchor href="/signin">Already have an account?</Anchor>
				</Container>
			</form>
		</>
	);
};
