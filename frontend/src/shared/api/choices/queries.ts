import { IChoice } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";

export const getAllChoices = async (storyId: number, sceneId: number): Promise<IChoice[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.choices.getAllChoices(storyId, sceneId));
    return response.data.choices;
  } catch (error) {
    throw error;
  }
};