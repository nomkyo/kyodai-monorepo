import type { FunctionComponent } from "../common/types";
import { Schedule } from "../features/schedule/components/Schedule";

export const Home = (): FunctionComponent => {
	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center ">
			<Schedule />
		</div>
	);
};
