"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { IScene } from "../../types";
import { getAllChoices } from "@/shared/api/choices/queries";
import { getOneScene } from "@/shared/api/scenes/queries";

export const useScene = () => {
	const pathname = usePathname();
	const [scene, setScene] = useState<IScene | null>(null);
	const getScene = async (sceneId?: number) => {
		const URLsceneId = sceneId ? sceneId : pathname.split("/")[3];
		const storyId = pathname.split("/")[2];
		const getScene = await getOneScene(+storyId, +URLsceneId!);
		const sceneChoices = await getAllChoices(+storyId, +URLsceneId!);
		if (getScene) {
			setScene({ ...getScene, choices: sceneChoices! });
			return { ...getScene, choices: sceneChoices };
		}
		return null;
	};

	return { getScene, scene };
};
