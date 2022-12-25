import { useEffect, useState } from "react";
import "./Home.style.scss"
import MainCardNewsStories from "../../components/MainNewsStoriesCard/MainNewsStoriesCard.component"
import { getStoriesWithKarmaScore } from "../../services/functions";
import { StoryData } from "../../services/types";

export default function Home() {
    const [error, setError] = useState<boolean>(false);
    const [items, setItems] = useState<StoryData[]>([])

    useEffect(() => {
        getStoriesWithKarmaScore().then(data => {
            data.error ? setError(true) : setError(false)
            data.data ? setItems(data.data.sort((a, b) => a.score < b.score ? -1 : 1)) : setItems([])
        });
    }, [])

    return (
        <>
            {error && <h1>Error !</h1>}
            {items && items.map((story) => (
                <div key={story.id}>
                    <MainCardNewsStories storyData={story} />
                </div>
            ))}
        </>
    )
}


