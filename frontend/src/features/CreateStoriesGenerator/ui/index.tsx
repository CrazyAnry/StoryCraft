"use client";

import React, { useEffect, useState } from "react";
import s from "./CreateStoriesGenerator.module.scss";
import { PaginationButtons } from "@/shared/ui";
import { useStories } from "@/shared/lib/hooks/useStories";
import { AddStoryCard, CreateStoryCard } from "@/entities";
import { useSortedStoriesStore } from "@/shared/stores/sortedStories";

export default function CreateStoriesGenerator() {
	const { fetchAllUsersStoriesByLimit } = useStories();
	const { setSortedStories, sortedStories } = useSortedStoriesStore();

	useEffect(() => {
		const getStories = async () => {
			setSortedStories(await fetchAllUsersStoriesByLimit());
		};

		getStories();
	}, []);

	if (!sortedStories) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<div className={s.stories}>
				{sortedStories.map((story) => (
					<CreateStoryCard
						image={story.image!}
						key={story.id}
						id={story.id!}
						title={story.title!}
						author={story.authorName!}
					/>
				))}
				<AddStoryCard />
			</div>
			<PaginationButtons mode={"create"} />
		</>
	);
}
