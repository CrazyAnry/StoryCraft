import axios from "axios";
import axiosInstance from "../client";
import { API_ROUTES } from "../endpoints";
import { toast } from "react-toastify";

export const follow = async (followerId: number) => {
	try {
		const response = await axiosInstance.post(
			API_ROUTES.follow.follow + followerId,
		);
		return response.data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(`Ошибка при подписке: ${error.response?.data.message}`);
			return;
		}
		throw error;
	}
};

export const unfollow = async (followerId: number) => {
	try {
		const response = await axiosInstance.delete(
			API_ROUTES.follow.unfollow + followerId,
		);
		return response.data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(`Ошибка при отписке: ${error.response?.data.message}`);
			return;
		}
		throw error;
	}
};
