import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";

export default function PrivateStory() {
	const { story, setIsPublic } = useStoryEditorStore(
		useShallow((state) => state),
	);
	const { updateStory } = useStories();

	const handlePrivateStory = async () => {
		try {
			await updateStory({ ...story!, isPublic: false });
			setIsPublic(false);
			toast.success("История скрыта");
		} catch (error) {
			throw error;
		}
	};

	return (
		<button
			className={`${s.controlButton} ${s.unpublish} ${
				!story?.isPublic ? s.disabled : ""
			}`}
			onClick={handlePrivateStory}
			disabled={!story?.isPublic}
		>
			Отменить публикацию
		</button>
	);
}
