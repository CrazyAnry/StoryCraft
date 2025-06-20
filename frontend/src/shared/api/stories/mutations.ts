import { IStoryHeader } from "@/shared/lib";
import axiosInstance from "../client";
import { IStoryCreate } from "@/shared/lib/types/IStoryCreate";

export const changeStory = async (storyId: number, body: IStoryCreate): Promise<IStoryHeader> => {
  try {
    const response = await axiosInstance.patch(`/stories/my/${storyId}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStory = async (body: IStoryCreate): Promise<IStoryHeader> => {
  try {
    const response = await axiosInstance.post(`/stories`, body);
    return response.data.story;
  } catch (error) {
    throw error;
  }
};