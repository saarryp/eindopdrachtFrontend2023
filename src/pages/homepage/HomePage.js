import React from 'react';
import { Link} from 'react-router-dom';
import "./HomePage.css";
import LoginButton from "../../components/loginButton/LoginButton";
import SubscribeButton from "../../components/subscribeButton/SubscribeButton";
import AdminLoginButton from "../../components/adminLoginModal/AdminLoginModal";



export default function Home() {
    return (
        <>
            <div className="container-about-photo">
                <div className="image-element-gl"></div>
                <div className="position-text-button">
                    <div className="position-text-and-rest">
                        <article className="about-us">
                            <p>Are you bored of that same shizzle again and again?</p>
                            <p>Is a streaming service sending you the same suggestions?</p>
                            <p>Are you into soul, funk, disco and other related genres?</p>
                            <p className="yes">YES?</p>
                            <p>Join our platform of fellow music-lovers.</p>
                            <p>Make your own top 10 of not-to-be-missed tunes.</p>
                            <p className="inspire">INSPIRE AND GET INSPIRED.</p>
                        </article>
                        <div className="container-subscribe-button-about">
                            <SubscribeButton/>
                            <LoginButton/>
                        </div>
                            {/*<div className="admin-login">*/}
                            {/*    <span className="admin-link">*/}
                            {/*    <AdminLoginButton/>*/}
                            {/*    </span>*/}
                                <Link to="/admin-login" className="admin-link">
                                  Admin
                                </Link>
                                {/*<span className="admin-tooltip">*/}
                                {/*    admin Login*/}
                                {/*</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
}