import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo_bg.png'

export const Navbar = () :JSX.Element=>{
    return(
        <nav className='bg-wgite border-gray-300 px-2 sm:px-4 py-2 dark:bg-gray-800 container flex flex-wrap justify-between items-center mx-auto'>
            <NavLink to="/">
                <img src={logo} alt="logo" className='w-4 md:w-8 lg:w-12 rounded-xl'/>
            </NavLink>
            <ul className='flex flex-row  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium h-full'>
                <li>
                    <NavLink to="/map" className={isActive =>
    "navlinkText" + (!isActive ? " unselected" : "")}>
                        Map
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/store" className={isActive =>
    "navlinkText" + (!isActive ? " unselected" : "")}>
                        Store
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logs" className={isActive =>
    "navlinkText" + (!isActive ? " unselected" : "")}>
                        Logs
                    </NavLink>
                </li>
            </ul>
            
        </nav>
    );
}