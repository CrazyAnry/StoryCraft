"use client";

import React, { useEffect, useState } from "react";
import s from "./ChoicesGenerator.module.scss";
import { ReadChoiceCard } from "@/entities";
import { IChoice } from "@/shared/lib";

interface Props {
	choices: IChoice[];
}

export default function ChoicesGenerator({ choices }: Props) {
	const [chunkedChoices, setChunkedChoices] = useState<IChoice[][]>([]);

	useEffect(() => {
		const safeChoices = choices || [];
		const chunks = [];
		for (let i = 0; i < safeChoices.length; i += 3) {
			chunks.push(safeChoices.slice(i, i + 3));
		}
		setChunkedChoices(chunks);
	}, [choices]);

	return (
		<div className={s.choicesContainer}>
			<div className={`${s.answersBody}`}>
					{choices.map((choice, index) => (
						<ReadChoiceCard
							key={`${index}`}
							StoryId={choice.storyId}
							nextSceneId={choice.nextSceneId}
							access={choice.access}
						>
							{choice.text}
						</ReadChoiceCard>
					))}
				</div>
		</div>
	);
}
