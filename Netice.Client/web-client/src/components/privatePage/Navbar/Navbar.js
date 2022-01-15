import React, {useContext} from "react";
import { CgMonday } from "react-icons/cg";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/authProvider';

const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
    const authContext = useContext(AuthContext);
    
    return (
        <nav className={'hidden md:flex flex-row items-center justify-between px-8 h-18 rounded-b-3xl bg-white'}>
            <span className={'text-5xl text-gray-800 -mb-1'}>
                <CgMonday />
            </span>
            <ul className={'flex justify-center items-center self-end h-16 gap-6 flex-row'}>
                {navigationData.map((item, index) => (
                    <Link to={item} key={index} style={{ textDecoration: 'none' }}> 
                    <li
                        className={classNames([
                            'w-2/16 text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex justify-center py-5',
                            currentRoute === item && 'text-gray-700 border-b-2 border-gray-700 bg-gradient-to-b from-white to-gray-100',
                        ])}
                        key={index}
                        onClick={() => setCurrentRoute(item)}
                    >
                        {item}
                    </li>
                    </Link>
                ))}
            </ul>
            <button onClick={authContext.logout} className={'bg-white hover:bg-gray-50 border-2 border-gray-900 text-sm text-gray-900 py-3 px-5 rounded-lg font-medium tracking-wide leading-none'}>Logout</button>
        </nav>
    );
};

export default Navbar;