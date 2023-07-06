import React from "react";
import "./AboutUs.css";


export default function AboutUs() {
    return (
        <>
            <div className="container-about-photo">
            <div className="image-element-au"></div>
                <div className="position-text-button">
            <div className="container-text-about">
            <article className="about-us">
                <p> Does the algorithm decide what the best fit should be?</p>
                <p>Bloody annoying right?</p>
                <p>We decided to get involved and set up a platform.</p>
                <p> So what is the deal?</p>
                <p className="bangers">MAKE YOUR OWN TOP 10 BANGERS</p>
                <p>Could be anything from jazz to disco to house to soul.</p>
                <p> As long we can groove on it. </p>
                <p>It is harder than you think.</p>
                <p>By bringing all soulful music lovers together, we hope to get you inspired. </p>
                <p>And you inspire others with your not-to-be-missed songs.</p>
                <p className="go-on">Go on and make you own list!</p>

            </article>
                <div className="container-subscribe-button-about">
                    <button className="subscribe-button">SUBSCRIBE</button>
                    <button className="login-button">LOGIN</button>
                </div>
            </div>
                </div>
            </div>
        </>
    );
}