import { IStoryHeader, IView } from "@/shared/lib";
import { StateCreator } from "zustand";

export interface sortedStoriesSlice {
	sortedStories: IStoryHeader[];
	currentPage: number;
	limit: number;
	setSortedStories: (stories: IStoryHeader[]) => void;
	setCurrentPage: (page: number) => void;
	sortStories: (
		value: string,
		getLikesCount: (id: number) => Promise<number>,
		getViews: (id: number) => Promise<number>,
	) => Promise<void>;
}

export const sortedStoriesSlice: StateCreator<sortedStoriesSlice> = (
	set,
	get,
) => ({
	sortedStories: [],
	currentPage: 1,
	limit: 8,

	setSortedStories: (stories) => set({ sortedStories: stories }),

	setCurrentPage: (page) => set({ currentPage: page }),

	sortStories: async (value, getLikesCount, getViews) => {
		const { sortedStories } = get();

		const storiesWithData = await Promise.all(
			sortedStories.map(async (story) => {
				const data =
					value === "likes"
						? await getLikesCount(story.id!)
						: await getViews(story.id!);
				return { ...story, sortValue: data || 0 };
			}),
		);

		const sorted = [...storiesWithData].sort(
			(a, b) => b.sortValue - a.sortValue,
		);
		set({ sortedStories: sorted });
	},
});
