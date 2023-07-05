import React from 'react';
import "./HomePage.css";
// import gil from "../../assets/gil-scott-heron.jpg";


export default function Home() {
    return (
        <>
        <div className="container-homepage-photo">
            <div className="image-element"></div>
            {/*<img src= {gil} alt= "musician Gil Scott-Heron" className="image-element"/>*/}
               <div className="position-text-and-rest">
                    <div className="container-text">
                        <article className="homepage-text">
                            <p>Are you bored of that same shizzle again and again?</p>
                            <p>Is a streaming service sending you the same suggestions?</p>
                            <p>Are you into soul, funk, disco and other related genres?</p>
                            <p className="yes">YES?</p>
                            <p>Join our platform of fellow music-lovers.</p>
                            <p>Make your own top 10 of not-to-be-missed tunes.</p>
                            <p className="inspire"> INSPIRE AND GET INSPIRED.</p>
                    </article>
                    </div>
                    <div className="container-subscribe-button">
                        <button className= "subscribe-button">SUBSCRIBE</button>
                        <button className="login-button">LOG IN</button>
                    </div>
               </div>
        </div>

        </>
    );
}