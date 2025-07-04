import { useEffect, useState } from "react";
import { Card } from "../../types/IEndCards";
import { useStories } from "../useStories";

export const useEndCards = () => {
  const { getStory, oneStory } = useStories();

  useEffect(() => {
    async function getStoryUseEffect() {
      await getStory();
    }
    getStoryUseEffect();
    setEndCards([
      { text: "Домой", path: "/" },
      { text: "Вернуться к истории", path: `/read/${oneStory?.id}` },
      {
        text: "Вернуться к первой сцене",
        path: `/read/${oneStory?.id}/${oneStory?.scenes![0].id}`,
      },
    ]);
  }, [oneStory]);

  const [EndCards, setEndCards] = useState<Card[]>();

  return { EndCards, setEndCards };
};
