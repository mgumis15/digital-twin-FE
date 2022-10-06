import { useEffect,useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo_bg.png'
import { HamburgerButton } from './HamburgerButton.component';

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

export const Navbar = () :JSX.Element=>{
    const [active, setActive] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const location = useLocation();
    const activateHamburger=()=>{
        setActive(prev=>!prev)
    }
    useEffect(()=>{
    },[location])
    return(
        <nav className={`bg-wgite border-gray-300 px-2 sm:px-4 py-2 dark:bg-gray-700  flex sm:flex-wrap flex-col sm:flex-row justify-center items-center mx-auto sticky w-full `}>
            <div className='sm:absolute left-4 flex flex-row w-11/12 sm:w-auto justify-between'>
                <NavLink to="/" className=' flex h-full text-4xl justify-between items-center space-x-4'>
                    <img src={logo} alt="logo" className='w-12 rounded-xl outline outline-sky-500'/>
                    <h1 className='text-white hidden md:block text-3xl'>
                        Digital Twin
                    </h1>
                </NavLink>
                
                <HamburgerButton active={active} setActive={activateHamburger}></HamburgerButton>
            </div>
           
            <ul className={`flex self-center flex-col sm:flex-row justify-between items-center text-center  ${active||windowSize.innerWidth>=640?`h-auto`:`h-0 hidden` } transition-height duration-500 ease-in`}>
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