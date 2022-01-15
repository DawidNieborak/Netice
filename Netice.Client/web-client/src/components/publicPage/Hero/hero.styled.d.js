import styled from 'styled-components';

export const HeroContainer = styled.section`
    min-height: 100vh;
    max-height: 100vh;
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center; 
    
    .vertical {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        top: -100px;
    }
    
    & .vertical h1 {
        color: ${props => props.theme.main_gray_dark};
        font-size: 2.5rem;
        font-weight: 100;
        text-align: left;
    }
    
    @media only screen and (max-width: 900px) {
        flex-direction: column;
    }
`