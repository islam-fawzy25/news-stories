import React from "react";
import "./MainNewsStoriesCard.style.scss";
import logo from "../../images/logo512.png";

interface Props {
    storyData: Data
    children: JSX.Element
}
interface Data {
    title: string
    url: string
    score: number
    id: number
    time: string

}

export default function MainCardNewsStories({ storyData, children }: Props) {

    return (
        <div className="story-card-container">
            {storyData && <div className="story-card">
                <div className="story-card-image">
                    <img src={logo} alt="" />
                </div>
                <div className="story-card-content-container">
                    <div className="story-card-content-title">
                        <h4> {storyData.title}</h4>
                    </div>
                    <div className="story-card-content">
                        <div>
                            <p><a href={storyData.url} target="_blank" rel="noreferrer">Story link</a> </p>
                        </div>
                        <div>
                            <p><b> Story score </b></p> <p>{storyData.score}</p>
                        </div>
                        <div>
                            <p><b> Author id </b></p><p>{storyData.id}</p>
                        </div>
                        <div>
                            <p><b>Time </b></p> <p>{storyData.time}</p>
                        </div>
                        <div>
                            <p><b>Karma score </b></p><p>{children}</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>

    )
}