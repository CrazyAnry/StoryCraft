import { IChoice } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import axios from "axios";

export const getAllChoices = async (
	storyId: number,
	sceneId: number,
): Promise<IChoice[] | null> => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.choices.getAllChoices(storyId, sceneId),
		);
		return response.data.choices;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
};
