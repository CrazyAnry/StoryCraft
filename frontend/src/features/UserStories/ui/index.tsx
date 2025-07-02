"use client";

import StoryCard from "@/features/Story";
import React, { useEffect } from "react";
import { useUsersStore } from "@/shared/stores/users";
import { IStoryHeader } from "@/shared/lib/types";
import { getAllStoriesById } from "@/shared/api/stories/queries";
import s from "./UserStories.module.scss";

interface UserStoriesProps {
	userId: number;
}

const UserStories = ({ userId }: UserStoriesProps) => {
	const { allUserStories, setAllUserStories } = useUsersStore((state) => state);

	useEffect(() => {
		const fetchAllUserStories = async () => {
			try {
				const newAllUserStories = await getAllStoriesById(userId, 1, 8);
				setAllUserStories(newAllUserStories);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllUserStories();
	}, [userId]);

	return (
		<div className={s.stories}>
			{allUserStories.map((story: IStoryHeader) => (
				<StoryCard
					id={story.id!}
					title={story.title!}
					author={story.authorName!}
					image={story.image!}
					key={story.id}
				/>
			))}
		</div>
	);
};

export default UserStories;
