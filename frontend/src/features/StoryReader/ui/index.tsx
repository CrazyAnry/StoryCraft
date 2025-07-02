"use client";

import React, { useEffect } from "react";
import s from "./StoryReader.module.scss";
import { ChoicesGenerator } from "@/features";
import { usePathname } from "next/navigation";
import { useScene } from "@/shared/lib/hooks/useScene";
import IsEndCards from "@/entities/IsEndCards/ui";
import { StoryQuestionBase } from "@/entities";

export default function StoryReader() {
	const pathname = usePathname();
	const { getScene, scene } = useScene();

	useEffect(() => {
		getScene();
	}, [pathname]);

	if (scene === null) {
		return <h1>Loading...</h1>;
	}

	if (scene.isEnd) {
		return (
			<div className={s.container}>
				<StoryQuestionBase />
				<IsEndCards />
			</div>
		);
	}

	return (
		<div className={s.container}>
			<StoryQuestionBase />
			<ChoicesGenerator choices={scene?.choices!} />
		</div>
	);
}
