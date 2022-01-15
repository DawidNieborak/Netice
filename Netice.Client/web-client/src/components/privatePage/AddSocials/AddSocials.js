import React, { useState, useEffect } from 'react';
import '../../../globalStyles/simple-line-icons.css';
import PrivatePage from '../PrivatePage';
import { getTwitterProfileService } from '../../../services/apiService';

import { Tab } from '@headlessui/react'
import TwitterTab from './Tabs/TwitterTab';
import InstagramTab from './Tabs/InstagramTab';
import FacebookTab from './Tabs/FacebookTab';
import YouTubeTab from './Tabs/YouTubeTab';
import ModalC from './ModalC';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AddSocials = ( props ) => {
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [categories] = useState({
        Twitter: [
            {
                id: 1,
                component: <TwitterTab />
            }
        ],
        Instagram: [
            {
                id: 1,
                component: <InstagramTab />
            }
        ],
        Youtube: [
            {
                id: 1,
                component: <YouTubeTab />
            }
        ],
        Facebook: [
            {
                id: 1,
                component: <FacebookTab />
            }
        ],
    });
    
    return(
        <PrivatePage direction={"Add Socials"}>
            <div className="w-full max-w-md px-2 py-16 sm:px-0" style={{marginTop: '-10%'}}>
                <h2 className={'text-2xl font-normal leading-normal mt-0 mb-2 text-blueGray-800 mb-8 '}>Find & connect your social profiles, add them to your profile collection and recive your data.</h2>
                
                <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                        { Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                { category }
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(categories).map((items, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'bg-white rounded-xl p-3',
                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                                )}
                            >
                                <ul>
                                    
                                    { items.map((item) => (
                                        <li
                                            key={ item.id }
                                            className="relative p-3 rounded-md hover:bg-coolGray-100"
                                        >
                                            { item.component }
                                            
                                        </li>
                                    ))}
                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </PrivatePage>
    );
}

export default AddSocials;