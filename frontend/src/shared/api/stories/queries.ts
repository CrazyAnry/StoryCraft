import { IStoryHeader, IView, ILike } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { getAllScenes } from "../scenes/queries";
import { getAllChoices } from "../choices/queries";
import axios from "axios";

export const getAllStories = async (): Promise<IStoryHeader[]> => {
	try {
		const response = await axiosInstance.get(
			`${API_ROUTES.stories.AllStories}`,
		);
		return response.data.stories;
	} catch (error) {
		throw error;
	}
};

export const getAllStoriesById = async (
	id: number,
	page: number,
	limit: number,
): Promise<IStoryHeader[]> => {
	try {
		const response = await axiosInstance.get(
			`${API_ROUTES.stories.AllStoriesById}${id}/paginated`,
			{ params: { page, limit } },
		);
		return response.data.stories;
	} catch (error) {
		throw error;
	}
};

export const getStoriesByLimit = async (
	page: number,
	limit: number,
): Promise<IStoryHeader[]> => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.stories.getStoriesByLimit,
			{ params: { page, limit } },
		);
		return response.data.stories;
	} catch (error) {
		throw error;
	}
};

export const getUsersStoriesByLimit = async (
	page: number,
	limit: number,
): Promise<IStoryHeader[]> => {
	try {
		const response = await axiosInstance.get(`/stories/my/paginated`, {
			params: { page, limit },
		});
		return response.data.stories;
	} catch (error) {
		throw error;
	}
};

export const getOneStory = async (
	storyId: number,
): Promise<IStoryHeader | null> => {
	try {
		const story = await axiosInstance.get(
			API_ROUTES.stories.getOneStory(storyId),
		);
		const gettedScenes = await getAllScenes(storyId);
		const scenes = [];
		if (!gettedScenes) return { ...story.data.story, scenes: [] };
		for (const scene of gettedScenes) {
			const choices = await getAllChoices(storyId, scene.id!);
			scenes.push({ ...scene, choices });
		}

		return {
			...story.data.story,
			scenes,
		};
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null;
		}
		throw error;
	}
};

export const getStoryLikesCount = async (storyId: number): Promise<number> => {
	try {
		const storyLikes = await axiosInstance.get(
			API_ROUTES.stories.getStoryLikes(storyId),
		);
		return storyLikes.data.likes.length;
	} catch (error) {
		throw error;
	}
};

export const getStoryLikes = async (storyId: number): Promise<ILike[]> => {
	try {
		const storyLikes = await axiosInstance.get(
			API_ROUTES.stories.getStoryLikes(storyId),
		);
		return storyLikes.data.likes;
	} catch (error) {
		throw error;
	}
};

export const setStoryLike = async (storyId: number): Promise<ILike> => {
	try {
		const storyLikes = await axiosInstance.patch(
			API_ROUTES.stories.setStoryLike(storyId),
		);
		return storyLikes.data;
	} catch (error) {
		throw error;
	}
};

export const deleteStoryLike = async (storyId: number): Promise<ILike> => {
	try {
		const storyLikes = await axiosInstance.patch(
			API_ROUTES.stories.deleteStoryLike(storyId),
		);
		return storyLikes.data;
	} catch (error) {
		throw error;
	}
};

export const getStoryViews = async (storyId: number): Promise<number> => {
	try {
		const storyViews = await axiosInstance.get(
			API_ROUTES.stories.getStoryViews(storyId),
		);
		return storyViews.data.views.length;
	} catch (error) {
		throw error;
	}
};

export const setStoryView = async (storyId: number): Promise<IView> => {
	try {
		const storyView = await axiosInstance.patch(
			API_ROUTES.stories.setStoryView(storyId),
		);
		return storyView.data;
	} catch (error) {
		throw error;
	}
};
