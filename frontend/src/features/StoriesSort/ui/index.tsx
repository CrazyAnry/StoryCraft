"use client";

import React from "react";
import s from "./StoriesSort.module.scss";
import { CustomSelect } from "@/shared/ui";
import { useStories } from "@/shared/lib/hooks/useStories";
import { useSortedStoriesStore } from "@/shared/stores/sortedStories";
import { useLikes, useViews } from "@/shared/lib";

export default function StoriesSort() {
	const { sortStories } = useSortedStoriesStore();
	const { getLikesCount } = useLikes();
	const { getViews } = useViews();

	return (
		<>
			<div className={s.storiesSort}>
				<h1>Истории</h1>
				<CustomSelect
					onChange={async (value: string) => {
						await sortStories(value, getLikesCount, getViews);
					}}
					options={[
						{
							content: "Сортировать по лайкам",
							value: "likes",
							disabled: false,
						},
						{
							content: "Сортировать по просмотрам",
							value: "views",
							disabled: false,
						},
					]}
					defaultValue={{
						content: "Сортировать по лайкам",
						value: "likes",
						disabled: false,
					}}
				/>
			</div>
		</>
	);
}
