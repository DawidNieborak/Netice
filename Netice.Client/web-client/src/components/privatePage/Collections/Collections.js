import React, {useState, useEffect, useContext} from 'react';
import { getUserCollectionsSerivce } from '../../../services/apiService';
import PrivatePage from '../PrivatePage';
import { RadioGroup } from '@headlessui/react'
import { deleteSocialToProfile } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import imgBlank from '../../../assets/illustrations/undraw_social_notifications_re_xcbi.svg';

const styles = styled.div`
    background: ${props => props.theme.main_gray};
    postion: relative;
    font-size: 1rem;
    color: ${props => props.theme.main_gray_dark};
    width: 100%;
`;

export default function Collections(props) {
    const [socials, setSocials] = useState([]);
    const [selected, setSelected] = useState(socials[0])
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteSocialFromProfile = async (socialID) => {
        if (socials) {
            let response = deleteSocialToProfile(socialID);
            await fetchData();
            response.then(el => {
                if (el.status == 500 || el.status == 400){
                    toast.error('Error while trying to deleted your profile.', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                } else {
                    toast.success('Successfuly deleted your profile.', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                    setRefresh((prevRefresh) => !prevRefresh);
                }
            })

        }
    }
    
    const fetchData = async () => {
        setLoading(true);
        let res = getUserCollectionsSerivce("test_user_id");
        await res.then(el => JSON.parse(el)).then(async (el) => {
            if (el.data) {
                setSocials(el.data);
            } else {
                // return err and redirect;
            }
           await setLoading(false);
        });
    }
    
    useEffect(async () => {
        fetchData();
    }, [refresh]);

    if (socials.length == 0) {
        return (
            <PrivatePage>
                <div className={'flex flex-col'} >
                    <styles> 
                        <span className={`mb-10`}>Your collection is empty. 
                       <Link to={'/addsocials'}> Click Here </Link> to add your social profiles to collection.</span>
                    </styles>
                    
                    <img src={imgBlank} alt=""/>
                </div>
            </PrivatePage>
        )
    } else {
        return (
            <PrivatePage>
                { !loading ?
                    <div className="w-full px-4 py-16">
                        <div className="w-full max-w-md mx-auto">
                            <RadioGroup value={selected} onChange={setSelected}>
                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                { socials.length == 0 ? null :
                                    <div className="space-y-2">

                                        {socials.map((social) => (
                                            <RadioGroup.Option
                                                key={social.socialName}
                                                value={social}
                                                className={({ active, checked }) =>
                                                    `${
                                                        active
                                                            ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                                                            : ''
                                                    }
                    ${
                                                        checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                                    }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex items-center">
                                                                <div className="text-sm">
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className={`font-medium  ${
                                                                            checked ? 'text-white' : 'text-gray-900'
                                                                        }`}
                                                                    >
                                                                        {social.socialName}
                                                                    </RadioGroup.Label>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className={`inline ${
                                                                            checked ? 'text-sky-100' : 'text-gray-500'
                                                                        }`}
                                                                    >
                            <span>
                              {social.socialProfileUsername}/{social.socialId}
                            </span>{' '}
                                                                        <span aria-hidden="true">&middot;</span>{' '}
                                                                        <span>{social.dataGetUrl}</span>
                                                                    </RadioGroup.Description>
                                                                </div>
                                                            </div>
                                                            {checked && (
                                                                <>
                                                                    <div className="flex-shrink-0 text-white">
                                                                        <CheckIcon className="w-6 h-6" />
                                                                    </div>
                                                                    <button
                                                                        onClick={e => deleteSocialFromProfile(social.socialId)}
                                                                        className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">Delete</button>
                                                                </>

                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                }
                            </RadioGroup>
                        </div>
                    </div>
                    : <ReactLoading type='spin' color='#000' height={30} width={30}/> }
            </PrivatePage>
        )
    }
    
   
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}