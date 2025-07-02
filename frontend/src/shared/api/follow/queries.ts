import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { AuthResponse, UpdateUserJwtResponse } from "./types";
import { toast } from "react-toastify";
import axios from "axios";

export const getUsersFollowings = async (userId: number) => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.follow.followings + userId,
		);
		return response.data.follows;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при загрузке подписок: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};

export const getUsersFollowers = async (userId: number) => {
	try {
		const response = await axiosInstance.get(
			API_ROUTES.follow.followers + userId,
		);
		return response.data.follows;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при загрузке подписчиков: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};
