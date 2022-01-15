import React, { useState } from 'react';
import { getTwitterProfileService } from '../../../../services/apiService';
import ReactLoading from 'react-loading';
import ProfileCard from '../ProfileCard';
import ModalC from '../ModalC';

const TwitterTab = () => {
    const [inputValue, setInputValue] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const updateInputValue = (evt) => setInputValue(evt.target.value);
    const showModalHandler = () => setShowModal((prevShowModal) => !prevShowModal);
    const searchHandler = async (username) => {
        setLoading(true);
        

        let response = getTwitterProfileService(username);
        await response.then(el => JSON.parse(el)).then(async el => {
            // console.log(el.data.data);
            if (el.data){
                setProfiles(el.data.data);
                await setLoading(false);
            } else {
                // return err;
            }
        })
    }
    
    return (
        <>
            { showModal ? <ModalC data={profiles} /> : null }
            <div className="">
                <div className="flex justify-center items-center">
                    <div className="relative w-full">
                        <div className="absolute top-8 left-8 shadow"><i
                            className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i></div>
                        <input type="text"
                               className="shadow h-14 w-full pl-2 pr-20 rounded-lg z-0 focus:outline-none"
                               placeholder="Find your twitter profile."
                               onChange={evt => updateInputValue(evt)}
                        />
                            <div className="absolute top-2 right-2">
                                <button className="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600"
                                        onClick={e => searchHandler(inputValue)}
                                >Search 👋
                                </button>
                            </div>
                    </div>
                </div>
                { loading ? <ReactLoading type='spin' color='#000' height={30} width={30}/> : null }
                {profiles ?
                    profiles.map((el, index) => {
                        return <div className={'divignore'} key={index} onClick={e => showModalHandler()}><ProfileCard data={el}/>
                        </div>
                    }) : <span style={{textAlign: 'center', color: 'red', marginTop: "10px"}}>Did not found profile.</span>
                }
            </div>
        </>
    )
}

export default TwitterTab;