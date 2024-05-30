import { configureAuth } from "react-query-auth";
import { api } from "../../../common/ky";

type RegisterInput = {
	email: string;
	password: string;
};
async function registerFn(data: RegisterInput) {
	const user = await api.post("signup", { json: data }).json();
	console.log(user);
	return user;
}

const authConfig = {
	userFn: () => {},
	loginFn: () => {},
	registerFn,
	logoutFn: () => {},
};
export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
	configureAuth(authConfig);
