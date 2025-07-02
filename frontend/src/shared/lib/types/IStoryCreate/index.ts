export interface IStoryCreate {
	title: string | null;
	description: string | null;
	image: string | null;
	authorId: number | null;
	createdAt: string | null;
	updatedAt: string | null;
	isPublic: boolean;
	authorName?: string | null;
	sortValue?: number;
}
