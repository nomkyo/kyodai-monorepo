import type React from "react";
import { Schedule } from "../features/schedule/components/Schedule";

export const Home = (): React.ReactElement => {
	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center ">
			<Schedule />
		</div>
	);
};
