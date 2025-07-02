import { IScene, IStoryHeader } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import axios from "axios";

export const getAllScenes = async (
	storyId: number,
): Promise<IScene[] | null> => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.scenes.getAllScenes(storyId),
		);
		return response.data.scenes;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
};

export const getOneScene = async (
	storyId: number,
	sceneId: number,
): Promise<IScene | null> => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.scenes.getOneScene(storyId, sceneId),
		);
		return response.data.scene;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
};
