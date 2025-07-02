import { IChoice } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";

export const changeChoice = async (
	storyId: number,
	sceneId: number,
	choiceId: number,
	body: IChoice,
): Promise<IChoice> => {
	try {
		const response = await axiosInstance.patch(
			`/stories/${storyId}/scenes/${sceneId}/choices/${choiceId}`,
			body,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createChoice = async (
	storyId: number,
	sceneId: number,
	body: IChoice,
): Promise<IChoice> => {
	try {
		const response = await axiosInstance.post(
			`/stories/${storyId}/scenes/${sceneId}/choices`,
			body,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteChoice = async (
	storyId: number,
	sceneId: number,
	choiceId: number,
): Promise<IChoice> => {
	try {
		const response = await axiosInstance.delete(
			`/stories/${storyId}/scenes/${sceneId}/choices/${choiceId}`,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
