"use client";

import {
	deleteStoryLike,
	getStoryLikes,
	getStoryLikesCount,
	setStoryLike,
} from "@/shared/api/stories/queries";
import { useState } from "react";
import { ILike } from "../../types";

export const useLikes = () => {
	const [likesCount, setLikesCount] = useState<number>();
	const [likes, setLikes] = useState<ILike[]>();

	async function getLikesCount(storyId: number) {
		try {
			const likesCount = await getStoryLikesCount(storyId);
			setLikesCount(likesCount);
			return likesCount;
		} catch {
			setLikesCount(0);
			return 0;
		}
	}

	async function getLikes(storyId: number) {
		try {
			const likesCount = await getStoryLikes(storyId);
			setLikes(likesCount);
			return likesCount;
		} catch {
			setLikes([]);
			return [];
		}
	}

	async function setLike(storyId: number) {
		await setStoryLike(storyId);
		await getLikesCount(storyId);
	}

	async function deleteLike(storyId: number) {
		await deleteStoryLike(storyId);
		await getLikesCount(storyId);
	}

	return { getLikes, likes, setLike, deleteLike, getLikesCount, likesCount };
};
