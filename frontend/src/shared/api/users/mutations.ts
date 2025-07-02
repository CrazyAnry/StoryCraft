import { UpdateUserDto } from "./types";
import { axiosInstance } from "../client";
import { API_ROUTES } from "../endpoints";
import { toast } from "react-toastify";
import axios from "axios";

export const updateMe = async (id: string | number, data: UpdateUserDto) => {
	try {
		const idString = id.toString();
		const response = await axiosInstance.patch(
			API_ROUTES.users.updateMe + "/" + idString,
			data,
		);
		return response.data;
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			toast.error(
				`Ошибка при обновлении данных: ${error.response?.data.message}`,
			);
			return;
		}
		throw error;
	}
};

export const emailVerify = async (email: string) => {
	try {
		const currentEmail = { email: email };
		const response = await axiosInstance.post(
			API_ROUTES.auth.emailVerify,
			currentEmail,
		);
		return response.data;
	} catch (error: any) {
		throw error;
	}
};
