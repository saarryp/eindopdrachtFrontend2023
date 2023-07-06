import React from "react";
import "./AboutUs.css";
import LoginButton from "../../components/loginButton/LoginButton";
import SubscribeButton from "../../components/subscribeButton/SubscribeButton";


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
                            <p>We decided to get involved and set up a music platform.</p>
                            <p> So what is the deal?</p>
                            <p className="bangers">MAKE YOUR OWN TOP 10 BANGERS</p>
                            <p>Could be anything from jazz to disco to house to soul.</p>
                            <p> As long as we can groove on it. </p>
                            <p>And trust us, it is harder than you think.</p>
                            <p>By bringing all soulful music lovers together, we hope to get you inspired. </p>
                            <p>And you inspire others with your not-to-be-missed songs.</p>
                            <p className="go-on">Go on and make your own list!</p>
                        </article>
                        <div className="container-subscribe-button-about">
                            <SubscribeButton/>
                    {/*<button className="subscribe-button">SUBSCRIBE</button>*/}
                            <LoginButton/>
                    {/*<button className="login-button">LOGIN</button>*/}
                        </div>
                     </div>
                     </div>
            </div>
        </>
    );
}