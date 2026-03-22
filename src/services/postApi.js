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

export const postApi = {
	createPost: async (payload = {}) => {
		try {
			const formData = new FormData();

			if (payload.content) formData.append("content", payload.content);

			if (Array.isArray(payload.media) && payload.media.length > 0) {
				formData.append("media", JSON.stringify(payload.media));
			}

			if (Array.isArray(payload.videos) && payload.videos.length > 0) {
				formData.append("videos", JSON.stringify(payload.videos));
			}

			if (Array.isArray(payload.taggedUsers) && payload.taggedUsers.length > 0) {
				formData.append("taggedUsers", JSON.stringify(payload.taggedUsers));
			}

			if (Array.isArray(payload.mediaOrder) && payload.mediaOrder.length > 0) {
				formData.append("mediaOrder", JSON.stringify(payload.mediaOrder));
			}

			if (Array.isArray(payload.images) && payload.images.length > 0) {
				payload.images.forEach((file) => {
					formData.append("images", file);
				});
			}

			if (Array.isArray(payload.videoFiles) && payload.videoFiles.length > 0) {
				payload.videoFiles.forEach((file) => {
					formData.append("videos", file);
				});
			}

			const response = await api.post("/posts", formData, {
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
			handleApiError(error, "Tạo bài viết thất bại");
		}
	},

	getPosts: async () => {
		try {
			const response = await api.get("/posts");

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Không thể lấy danh sách bài viết");
		}
	},

	getPostsByOwner: async (ownerId) => {
		try {
			const url = ownerId ? `/posts/owner/${ownerId}` : "/posts/owner";
			const response = await api.get(url);

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Không thể lấy bài viết của người dùng");
		}
	},

	getPostById: async (postId) => {
		try {
			const response = await api.get(`/posts/${postId}`);

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Không thể lấy chi tiết bài viết");
		}
	},

	deletePost: async (postId) => {
		try {
			const response = await api.delete(`/posts/${postId}`);

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Xóa bài viết thất bại");
		}
	},

	addComment: async (postId, content) => {
		try {
			const response = await api.post(`/posts/${postId}/comment`, { content });

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Thêm bình luận thất bại");
		}
	},

	addReply: async (postId, parentCommentId, content) => {
		try {
			const response = await api.post(`/posts/${postId}/reply`, {
				parentCommentId,
				content,
			});

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Thêm phản hồi thất bại");
		}
	},

	getCommentsByPost: async (postId) => {
		try {
			const response = await api.get(`/posts/${postId}/comments`);

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Không thể lấy bình luận");
		}
	},

	reactToPost: async (postId, type) => {
		try {
			const response = await api.post(`/posts/${postId}/reaction`, { type });

			if (response.data.success === false) {
				toast.error(response.data.message);
				throw new Error(response.data.message);
			}

			return response.data;
		} catch (error) {
			handleApiError(error, "Thả cảm xúc thất bại");
		}
	},
};
