import React from "react";
import "./AboutUs.css";
import LoginButton from "../../components/loginButton/LoginButton";
import SubscribeButton from "../../components/subscribeButton/SubscribeButton";


export default function AboutUs() {
    return (
        <>
            <main className="container-about-photo">
                <div className="image-element-au"></div>
                <div className="position-text-button">
                    <div className="container-text-about">
                        <article className="about-us">
                            <p> We love music, sweet soul music.</p>
                            <p>We would like to be introduced to hidden gems. Not algorithms.</p>
                            <p>That is the reason to get involved and set up a music platform.</p>
                            <p> So what is the deal?</p>
                            <p className="bangers">MAKE YOUR OWN TOP 10 BANGERS</p>
                            <p>Could be anything from jazz to disco to house to soul.</p>
                            <p>And trust us, it is harder than you think.</p>
                            <p>Join us in our crusade for good soulful music.</p>
                            <p>Inspire others and get inspired with not-to-be-missed songs.</p>
                            <p className="go-on">Go on and make your own list!</p>
                        </article>
                        <div className="container-subscribe-button-about">
                            <SubscribeButton/>
                            <LoginButton/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}