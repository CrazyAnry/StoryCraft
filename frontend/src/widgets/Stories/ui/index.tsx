'use client'

import { StoriesGenerator, StoriesSort } from "@/features";
import s from "./Stories.module.scss";
import { useStories } from "@/shared/lib/hooks/useStories";
import { useEffect } from "react";
import { useSortedStoriesStore } from "@/shared/stores/sortedStories";

export default function Stories() {
	const { sortedStories } = useStories()
	const { setSortedStories } = useSortedStoriesStore()

	useEffect(() => {
		setSortedStories(sortedStories)
	}, [sortedStories]) 

	return (
		<>
			<StoriesSort/>
			<StoriesGenerator/>
		</>
	);
}
