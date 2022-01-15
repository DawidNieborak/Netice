import React, { useState, useEffect } from 'react';


//tyle
import { HeroContainer } from './hero.styled.d';
import { ButtonHero } from '../../sharedStyles/buttons.styled.d';

import '../../../globalStyles/simple-line-icons.css';

//ilustrations
import ilustrationHero from '../../../assets/illustrations/undraw_social_dashboard_k-3-pt.svg';

const Hero = () => {
    return(
        <HeroContainer>
            
            <div className={'vertical'}>

                <h1>
                    Begin your journey <br/>
                    with social media data, and
                    track your progress and efficiency.
                    
                    <br/>
                    
                </h1>

                <ButtonHero>START NOW</ButtonHero>
            </div>
  


            <img src={ilustrationHero} width={'60%'} alt=""/>
        </HeroContainer>
    );
}

export default Hero;