'use client'
import React from "react";
import s from "./AddImageModal.module.scss";
import NewModal from "@/shared/ui/newModal";
import { useStoryEditorStore } from "@/shared/stores";

interface Props {
  addImageTo: "story" | "scene";
}

const AddImageModal = ({ addImageTo }: Props) => {
  const { addStoryImageModalIsVisible, setAddStoryImageModalIsVisible, addSceneImageModalIsVisible, setAddSceneImageModalIsVisible } =
    useStoryEditorStore();

  const setIsVisible = addImageTo === "story" ? setAddStoryImageModalIsVisible : setAddSceneImageModalIsVisible;
  const isVisible = addImageTo === "story" ? addStoryImageModalIsVisible : addSceneImageModalIsVisible;

  return (
    <NewModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <label className={s.customFileUpload}>
        <input
          type="file"
        />
        📁 Загрузить изображение
      </label>
    </NewModal>
  );
};

export default AddImageModal;
