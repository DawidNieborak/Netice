import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/authProvider";
import Loading from '../common/loading';
import { DashboardContainer,ContentContainer, ContentContainerTitle } from './privatePage.styled.d';
import { getProfileService } from '../../services/apiService';
import Navbar from './Navbar/Navbar';
import Tabbar from './Navbar/Tabbar';
import styles from '../../global.css';
import { Link } from 'react-router-dom';
import useNavigation from '../../hooks/useNavigation';
import navigationData from '../../data/navigation';
import { FaDev } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

const PrivatePage = (props) => {
    const { currentRoute, setCurrentRoute } = useNavigation();
    const authContext = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect( async () => {
        if (userProfile == null) {
            setLoading(true);

            let response = getProfileService();
            await response.then(el => JSON.parse(el)).then(el => {
                if (el.data) {
                    setLoading(false);
                    setUserProfile(el.data);
                } else {
                    return <Redirect to="/" />
                }

            })
        }
        
    }, []);
    
    return (
        <>
            <div className={'bg-gray-200'}>
                <Navbar
                    navigationData={navigationData}
                    currentRoute={currentRoute}
                    setCurrentRoute={setCurrentRoute}
                />
                <Tabbar
                    navigationData={navigationData}
                    currentRoute={currentRoute}
                    setCurrentRoute={setCurrentRoute}
                />
                <ToastContainer />

            </div>
            <ContentContainer user={userProfile}>
                {/*<ContentContainerTitle><i className={'icon-directions'}></i> Dashboard / {props.direction}</ContentContainerTitle>*/}
                {props.children}
            </ContentContainer>
        </>
    );

};

export default PrivatePage;