import { IScene } from "@/shared/lib";
import axiosInstance from "../client";

export const changeScene = async (
	storyId: number,
	sceneId: number,
	body: IScene,
): Promise<IScene> => {
	try {
		const response = await axiosInstance.patch(
			`/stories/${storyId}/scene/${sceneId}`,
			body,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createScene = async (
	storyId: number,
	body: IScene,
): Promise<object> => {
	try {
		const response = await axiosInstance.post(
			`/stories/${storyId}/scene`,
			body,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteScene = async (
	storyId: number,
	sceneId: number,
): Promise<object> => {
	try {
		const response = await axiosInstance.delete(
			`stories/${storyId}/scene/${sceneId}`,
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
