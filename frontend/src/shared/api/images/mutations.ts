import { axiosSecondary } from "../client";
import { API_ROUTES } from "../endpoints";
import { toast } from "react-toastify";

export const uploadImage = async (image: File) => {
	const formData = new FormData();
	formData.append("file", image);

	try {
		const response = await axiosSecondary.post(
			API_ROUTES.images.uploadImage,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				// Explicitly accept 201 as valid status
				validateStatus: (status) =>
					(status >= 200 && status < 300) || status === 201,
			},
		);

		// Ensure response has expected format
		if (response.data && response.data.success) {
			return response.data;
		}
		throw new Error("Invalid response format");
	} catch (error: any) {
		console.error("Upload error:", {
			error: error.response?.data || error.message,
			status: error.response?.status,
			headers: error.response?.headers,
		});

		let errorMessage = "Ошибка при загрузке изображения";
		if (error.response) {
			errorMessage += `: ${error.response.data?.message || error.response.data?.error || `Статус: ${error.response.status}`}`;
		} else {
			errorMessage += `: ${error.message}`;
		}

		toast.error(errorMessage);
		throw error; // Re-throw to handle in component
	}
};
