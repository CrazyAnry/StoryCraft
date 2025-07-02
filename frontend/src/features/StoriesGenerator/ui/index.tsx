"use client";

import React from "react";
import s from "./StoriesGenerator.module.scss";
import { Story } from "@/features";
import { PaginationButtons } from "@/shared/ui";
import { useSortedStoriesStore } from "@/shared/stores/sortedStories";
import { useRouter } from "next/navigation";

export default function StoriesGenerator() {
	const { sortedStories } = useSortedStoriesStore();

	if (!sortedStories) return <h1>Loading...</h1>;

	return (
		<>
			<div className={s.stories}>
				{sortedStories.map((story) => (
					<Story
						image={story.image!}
						key={story.id}
						id={story.id!}
						title={story.title!}
						author={story.authorName!}
					/>
				))}
			</div>
			<PaginationButtons />
		</>
	);
}
