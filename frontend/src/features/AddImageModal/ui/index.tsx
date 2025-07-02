"use client";
import React, { useEffect } from "react";
import s from "./AddImageModal.module.scss";
import NewModal from "@/shared/ui/newModal";
import { useStoryEditorStore } from "@/shared/stores";
import { uploadImage as uploadImageMutation } from "@/shared/api/images/mutations";
import { toast } from "react-toastify";
import Image from "next/image";

interface Props {
  addImageTo: "story" | "scene";
  sceneId?: number;
}

const AddImageModal = ({ addImageTo, sceneId }: Props) => {
  const {
    addStoryImageModalIsVisible,
    setAddStoryImageModalIsVisible,
    addSceneImageModalIsVisible,
    setAddSceneImageModalIsVisible,
    addImageToStory,
    addImageToScene,
  } = useStoryEditorStore();

  const [file, setFile] = React.useState<File | null | undefined>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [finalImageUrl, setFinalImageUrl] = React.useState<string | null>(null);

  const setIsVisible =
    addImageTo === "story"
      ? setAddStoryImageModalIsVisible
      : setAddSceneImageModalIsVisible;
  const isVisible =
    addImageTo === "story"
      ? addStoryImageModalIsVisible
      : addSceneImageModalIsVisible;

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        setIsUploading(true);
        try {
          const response = await uploadImageMutation(file);

          if (response) {
            toast.success("Изображение успешно загружено");

            // Add image to either story or scene based on prop
            if (addImageTo === "story") {
              addImageToStory(response.url);
            } else {
              addImageToScene(response.url, sceneId!);
            }

            setFinalImageUrl(response.url);
          }
        } catch (error) {
          toast.error("Ошибка при загрузке изображения");
          console.error("Upload error:", error);
        } finally {
          setIsUploading(false);
        }
      };

      uploadFile();
    }
  }, [
    file,
    setIsVisible,
    addImageTo,
    sceneId,
    addImageToStory,
    addImageToScene,
  ]);

  return (
    <NewModal isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className={s.modalContent}>
        <label className={s.customFileUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0])}
            disabled={isUploading}
          />
          {isUploading ? "Загрузка..." : "📁 Загрузить изображение"}
        </label>

        {finalImageUrl && (
          <div className={s.fileInfo}>
            <Image
              width={500}
              height={300}
              src={finalImageUrl}
              alt="Selected Image"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
            />
          </div>
        )}
      </div>
    </NewModal>
  );
};

export default AddImageModal;
