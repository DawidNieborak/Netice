import styled from 'styled-components';


export const ProfileCardStyled = styled.div`
    margin-top: 15px;
    background: #fff;
    width: 100%;
    height: 110px;
    padding: 20px;
    font-weight: 300;
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: ${props => props.theme.main_boxshadow};
    display: flex;
    flex-direction: row;
    transition: .4s all;
    
    @media only screen and (max-width: 900px) {
        flex-direction: column;
        align-items: center;
        height: 200px;
    }
    
    
    &:hover{
        box-shadow: ${props => props.theme.main_boxshadow_active};
        cursor: pointer;
        position: relative;
        top: -2px;
    }

    
    img {
        max-height: 110px;
        max-width: 110px;
        padding: 5px;
        border-radius: 50%;
    }
    
    .horizontal {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        width: 100%;
        
        @media only screen and (max-width: 900px) {
            flex-direction: column;
            height: 200px;
        }
        
        .verifiedIcon{
            width: 30px;
            
        }
        
        .metrics{
            font-weight: 500;
            position: absolute;
            bottom: 0;
            right: 0;
            letter-spacing: 2px;
            color: ${props => props.theme.mainDark};
            display: flex;
            flex-direction: row;
            text-transform: uppercase;
            font-size: .55rem;
            gap: 15px;
            
            @media only screen and (max-width: 900px) {
                width: 100%;
                font-size: .40rem;
            }
            
            .horizontal--follow{
                display: flex;
                flex-direction: column;
                
                .horizontal--follow-count{
                    font-size: 1rem;
                    font-weight: 300;
                    letter-spacing: 1px;
                    color: ${props => props.theme.mainGray};
                }
            
            }
            
        }
        
        .horizontal--name {
            font-weight: 400;
            font-size: 1.2rem;
            letter-spacing: 1.5px;
            display: flex;
            align-items:center;
        }
        

    }
`

