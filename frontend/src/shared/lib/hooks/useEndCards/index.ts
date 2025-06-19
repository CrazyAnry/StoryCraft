import { useEffect } from "react";
import { Card } from "../../types/IEndCards";
import { useStories } from "../useStories";

export const useEndCards = () => {
    const {getStory, oneStory} = useStories()

    useEffect(() => {
        getStory()
    }, [])

    const EndCards: Card[] = [
        { text: "To home", path: "/" },
        { text: "To story", path: `/read/${oneStory?.id}` },
        { text: "To first scene", path: `/read/${oneStory?.id}/${oneStory?.scenes![0].id}` }
    ];

    return { EndCards }
}