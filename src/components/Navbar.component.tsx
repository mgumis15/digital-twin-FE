import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo_bg.png'


export const Navbar = () :JSX.Element=>{
    const location = useLocation();
    useEffect(()=>{
    },[location])
    return(
        <nav className='bg-wgite border-gray-300 px-2 sm:px-4 py-2 dark:bg-gray-700  flex flex-wrap justify-center items-center mx-auto sticky w-full'>
            <NavLink to="/" className=' absolute left-4 flex h-full text-4xl justify-between items-center space-x-4'>
                <img src={logo} alt="logo" className='w-12 rounded-xl outline outline-sky-500'/>
                <h1 className='text-white hidden md:block text-3xl'>
                    Digital Twin
                </h1>
            </NavLink>
            <ul className='flex self-center flex-row justify-between items-center text-center   h-full'>
                <li>
                    <NavLink to="/map"  className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Map
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/store" className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Store
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logs" className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Logs
                    </NavLink>
                </li>
            </ul>
            
        </nav>
    );
}