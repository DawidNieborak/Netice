import React, { useCallback } from "react";
import classNames from "classnames";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from 'react-icons/io';
import { BsFillBagFill, BsFillPersonFill, BsFillFileSpreadsheetFill, BsFillCollectionFill } from "react-icons/bs";
import { CgInbox } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Tabbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
    const getTabIcon = useCallback((item) => {
        switch (item) {
            case "Home":
                return <AiFillHome />;
            case "Addsocials":
                return <IoMdAddCircle />;
            case "Collections":
                return <BsFillCollectionFill />;
            case "Files":
                return <BsFillFileSpreadsheetFill />;
            case "Profile":
                return <BsFillPersonFill />;
        }
    }, []);

    return (
        <nav className={'flex items-center justify-center md:hidden flex-row items-center justify-around px-8 h-18 bg-white visible md:invisible fixed bottom-0 w-full rounded-t-3xl text-2xl'} style={{height: "50px"}}>
            {navigationData.map((item, index) => (
                <span
                    key={index}
                   
                    className={classNames([
                        'text-gray-400 hover:text-gray-700 cursor-pointer w-2/12 h-full flex items-center justify-center',
                        currentRoute === item && 'bg-gradient-to-t from-white to-gray-100 border-t-4 border-gray-700 text-gray-700',
                    ])}
                    onClick={() => setCurrentRoute(item)}
                >
                <Link key={index} to={item} style={{ textDecoration: 'none' }}>
                    <span className={'-mb-1'}>{getTabIcon(item)}</span>
                </Link>
        </span>
                
            ))}
        </nav>
    );
};

export default Tabbar;