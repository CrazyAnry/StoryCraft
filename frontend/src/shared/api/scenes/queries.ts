import { IScene, IStoryHeader } from "@/shared/lib";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { error } from "console";

export const getAllScenes = async (storyId: number): Promise<IScene[]> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.scenes.getAllScenes(storyId));
    return response.data.scenes;
  } catch (error) {
    throw error;
  }
};

export const getOneScene = async (storyId: number, sceneId: number): Promise<IScene> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.scenes.getOneScene(storyId, sceneId));
    return response.data.scene;
  } catch (error) {
    throw error;
  }
};