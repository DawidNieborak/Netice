import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { addSocialToProfile } from '../../../services/apiService';
import {toast} from "react-toastify";

export default function ModalC(props) {
    let [isOpen, setIsOpen] = useState(true)
    let [data, setData] = useState({});
    
    const closeModal = () => {
        setIsOpen(false)
    }
    
    useEffect(() => {;
        props.data.forEach(el => setData(el));
    }, []);

    const openModal = () => {
        setIsOpen(true)
    }
    
    const addProfileToCollection = () => {
        if (data){
            var item = JSON.stringify({
                "Beartoken": "null",
                "AccessSecret": "null",
                "SocialId": 2,
                "SocialName": "Twiter",
                "DataGetUrl": "https://twitter.com",
                "SocialProfileUsername": data.username,
                "SocialProfileId": data.id,
                "ConnectedSocialsId": "test_user_id",
                "AccessToken": "null"
            });
            
            let response = addSocialToProfile(item);
            response.then(el => {
                if (el.status == 500 || el.status == 400){
                    toast.error('Error you already added your profile of that kind. Check your collection.', {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });
                } else {
                    toast.success('Successful added profile to your collection.', {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                    });

                }
            })
            
            setIsOpen(false);
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    { data ? data.name : null }
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Do you want to add this profile to collection? <br/>
                                        Remember you can add only one profile.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className=" mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                        onClick={addProfileToCollection}
                                    >
                                        Add to collection
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}