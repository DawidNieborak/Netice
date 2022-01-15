import React, { useState, useEffect } from 'react';
import { ProfileCardStyled } from './addSocials.styled.d';
import verifiedIcon from '../../../assets/socialIcons/veryfiedTwitter.png';


const ProfileCard = (props) => {
    console.log(props.data);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setData(props.data);
        if(data != null){
            
            setLoading(false);
        } else {
            
            setData(props.data);
        }
    }, []);
    
    return(
        <ProfileCardStyled>

            <img src={props.data.profile_image_url} alt="picture"/>

            <div className="horizontal">
                <p className={'horizontal--name'}>{ props.data.name}
                    {props.data.verified ? <img src={verifiedIcon} width={100} className={'verifiedIcon'} alt=""/> : null}
                </p>

                <div className="metrics">
                    <p className={'horizontal--follow'}>
                        Followers
                        <span className={'horizontal--follow-count'}>  { props.data.public_metrics.followers_count }</span>
                    </p>

                    <p className={'horizontal--follow'}>
                        Following
                        <span className={'horizontal--follow-count'}>  { props.data.public_metrics.following_count }</span>
                    </p>

                    <p className={'horizontal--follow'}>
                        Tweets
                        <span className={'horizontal--follow-count'}>  { props.data.public_metrics.tweet_count }</span>
                    </p>
                </div>

            </div>

        </ProfileCardStyled>
        
    )
}

export default ProfileCard;