"use client";

import { getStoryViews, setStoryView } from "@/shared/api/stories/queries";
import { useState } from "react";

export const useViews = () => {
	const [views, setViews] = useState<number>();

	async function getViews(storyId: number) {
		try {
			const viewsCount = await getStoryViews(storyId);
			setViews(viewsCount);
			return viewsCount;
		} catch {
			setViews(0);
			return 0;
		}
	}

	async function setView(storyId: number) {
		await setStoryView(storyId);
		await getViews(storyId);
	}

	return { getViews, views, setView };
};
