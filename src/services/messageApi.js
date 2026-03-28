import { toast } from "react-hot-toast";
import api from "./api";

const handleApiError = (error, fallbackMessage) => {
	if (error.response) {
		const errorMessage = error.response.data?.message || fallbackMessage;
		toast.error(errorMessage);
		throw new Error(errorMessage);
	}

	toast.error(error.message || fallbackMessage);
	throw error;
};

export const messageApi = {
	sendMessage: async (payload = {}) => {
		try {
			const formData = new FormData();

			if (payload.chatId) formData.append("chatId", payload.chatId);
			if (payload.receiverId) formData.append("receiverId", payload.receiverId);
			if (typeof payload.text === "string") formData.append("text", payload.text);

			if (Array.isArray(payload.media) && payload.media.length > 0) {
				payload.media.forEach((item) => formData.append("media", item));
			}

			if (Array.isArray(payload.images) && payload.images.length > 0) {
				payload.images.forEach((file) => formData.append("images", file));
			}

			const response = await api.post("/messages/send", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Failed to send message");
		}
	},

	getHistoryChat: async (chatId, page = 1, limit = 20) => {
		try {
			const response = await api.get(`/messages/history/${chatId}`, {
				params: { page, limit },
			});

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Failed to get chat history");
		}
	},
};

