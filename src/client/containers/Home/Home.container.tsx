import { useEffect, useState } from "react";
import "./Home.style.scss"
import MainCardNewsStories from "../../components/MainNewsStoriesCard/MainNewsStoriesCard.component"
import KarmaScore from "../../components/karmaScore/KarmaScore.component";
import { getData } from "../../services/fetchData"

interface Item {
    id: number
    by: string
    title: string
    time: string
    score: number
    url: string
}
export default function Home() {
    const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
    const topStoriesUrl = `${baseUrl}topstories.json/`;
    const storyItemUrl = `${baseUrl}item/`;
    const userUrl = `https://hacker-news.firebaseio.com/v0/user/`;

    const [topstoriesLoading, setTopstoriesLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([])

    const getTopStoriesIds: number[] | any = async () => {
        try {
            let max
            let randomNumber

            setTopstoriesLoading(true)
            const { data: topStoriesIds, error }: any | boolean = await getData(topStoriesUrl)
            if (error) {
                setTopstoriesLoading(false)
                return setError(true)
            }
            // Get random 10 top stories ids
            max = (topStoriesIds.length - 10)
            randomNumber = Math.floor(Math.random() * (max - 0 + 1) + 0);
            setTopstoriesLoading(false)

            return topStoriesIds.slice(randomNumber, randomNumber+10)
        } catch (error) {
            setTopstoriesLoading(false)
            return setError(true)
        }
    }

    const getItems = async () => {
        try {
            setTopstoriesLoading(true)
            const topStoriesIds: number[] = await getTopStoriesIds()
            const getStoriesData = topStoriesIds.map(async (id: number) => {
                const { data: getStoryItemData, error }: any | boolean = await getData(`${storyItemUrl}${id.toString()}.json`);
                if (error) { setError(true) }
                return getStoryItemData
            })

            const result = getStoriesData.map((item) => {
                try {
                    item.then(res => {
                        res.time = new Date(res.time).toDateString()
                        setItems((prev) => {
                            return [...prev, res].slice(0, 10).sort((a, b) => a.score < b.score ? -1 : 1)
                        })
                        setTopstoriesLoading(false)
                    })
                } catch (error) {
                    setTopstoriesLoading(false)
                    return setError(true)
                }
                return item
            })
            return result
        } catch (error) {
            setTopstoriesLoading(false)
            return setError(true)
        }
    }
console.log("ff");

    useEffect(() => { getItems() }, [])

    return (
        <>
            {topstoriesLoading && <h1>Loading ...</h1>}
            {error && <h1>ERROR</h1>}
            {items && items.map(
                (story) => (
                    <div key={story.id}>
                        <MainCardNewsStories storyData={story}>
                            <KarmaScore url={`${userUrl}${story.by}.json`} />
                        </MainCardNewsStories>
                    </div>
                ))}
        </>
    )
}


