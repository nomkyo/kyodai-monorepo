import { configureAuth } from "react-query-auth";
import { api } from "../../../common/ky";

type RegisterInput = {
	email: string;
	password: string;
};
async function registerFn(data: RegisterInput): Promise<unknown> {
	const user = await api.post("signup", { json: data }).json();
	console.log(user);
	return user;
}

const authConfig = {
	registerFn,
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	configureAuth(authConfig);
