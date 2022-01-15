import React, { useEffect, useState, useContext } from "react";
import AuthService from "../../services/authService";
import { AuthContext } from "../../providers/authProvider";


// styles
import { Container } from '../sharedStyles/container.styled.d';
import { ScrollAnimation } from '../sharedStyles/scrollAnimation.d';
import { Tests } from './publicPage.styled.d';

// components 
import Hero from './Hero/Hero';
import Menu from './Menu/Menu';


const PublicPage = () => {
    const authContext = useContext(AuthContext);
    const [scrollAnimationPosition, setScrollAnimationPosition] = useState(0);
    
    const handleScroll = () => {
        let body = document.body,
            html = document.documentElement;

        let height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        let pageYOffsetNum = window.pageYOffset;
        Number.parseInt(height);
        Number.parseInt(pageYOffsetNum);
        Number.parseInt(html.clientHeight);
        
       var result = ((window.pageYOffset + html.clientHeight) / height  ) * 100;
       
       setScrollAnimationPosition(result);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    
    return (
        <Container>
            <Menu service={authContext} />
            <ScrollAnimation animate={`${scrollAnimationPosition}%`} />
            <Hero />
            
            
            <Tests>
                <a href="/dashboard"> GO TO PRIVATE</a>
            </Tests>

        </Container>
    );

};

export default PublicPage;