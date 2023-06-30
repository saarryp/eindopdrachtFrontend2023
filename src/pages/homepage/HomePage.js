import React from 'react';
import "./HomePage.css";
import gil from "../../assets/gil-scott-heron.jpg";






export default function Home() {
    return (
        <>
        <div>
            <h2>dit is de homepage</h2>
            <img src= {gil} alt= "musician Gil Scott-Heron" className="image-resize"/>
        </div>
            <article className="homepage-text">
                <p>Are you bored of that sames shizzle again?</p>

                <p>Is a streaming service sending you the same 'ole same 'ole?</p>
                <p>Are you into souls etc</p>
                <p>are you getting lost and lonely</p>
            </article>

            </>
    )
}