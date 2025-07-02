import React from "react";
import s from "./AddImage.module.scss";
import { useStoryEditorStore } from "@/shared/stores";

interface Props {
	addImageTo: "scene" | "story";
}

const AddImage = ({ addImageTo }: Props) => {
	const { setAddStoryImageModalIsVisible, setAddSceneImageModalIsVisible } =
		useStoryEditorStore();

	const openModal = () => {
		if (addImageTo === "story") {
			setAddStoryImageModalIsVisible(true);
		} else {
			setAddSceneImageModalIsVisible(true);
		}
	};

	return (
		<div>
			<button className={s.addStoryImage} onClick={openModal}>
				📁 Добавить изображение
			</button>
		</div>
	);
};

export default AddImage;
