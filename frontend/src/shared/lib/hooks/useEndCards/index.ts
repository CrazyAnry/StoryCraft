import { useEffect } from "react";
import { Card } from "../../types/IEndCards";
import { useStories } from "../useStories";

export const useEndCards = () => {
    const {getStory, story} = useStories()

    useEffect(() => {
        getStory()
    }, [])

    const EndCards: Card[] = [
        { text: "To home", path: "/" },
        { text: "To story", path: `/read/${story?.id}` },
        { text: "To first scene", path: `/read/${story?.id}/${story?.scenes[0].id}` }
    ];

    return { EndCards }
}