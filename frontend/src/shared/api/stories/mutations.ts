import { IStoryHeader } from "@/shared/lib";
import axiosInstance from "../client";
import { IStoryCreate } from "@/shared/lib/types/IStoryCreate";
import axios from "axios";
import { toast } from "react-toastify";

export const changeStory = async (
	storyId: number,
	body: IStoryCreate,
): Promise<IStoryHeader | undefined> => {
	try {
		const response = await axiosInstance.patch(`/stories/my/${storyId}`, body);
		return response.data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при изменении истории: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};

export const createStory = async (
	body: IStoryCreate,
): Promise<IStoryHeader | undefined> => {
	try {
		const response = await axiosInstance.post(`/stories`, body);
		return response.data.story;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при создании истории: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};

export const deleteStory = async (
	storyId: number,
): Promise<IStoryHeader | undefined> => {
	try {
		const response = await axiosInstance.delete(`/stories/my/${storyId}`);
		return response.data.story;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при удалении истории: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};
