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
        if(getWindowSize().innerWidth>700){
            setActive(false);
        }
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
        <nav className={`bg-wgite border-gray-300 px-2 sm:px-4 py-3 dark:bg-gray-700  flex sm:flex-wrap flex-col sm:flex-row justify-center items-center mx-auto sticky w-full z-20`}>
            <div className='sm:absolute left-4 flex flex-row w-11/12 sm:w-auto justify-between'>
                <NavLink to="/" className=' flex h-full text-4xl justify-between items-center space-x-4'>
                    <img src={logo} alt="logo" className='w-12 rounded-xl outline outline-sky-500'/>
                    <h1 className='text-white hidden sm:block text-3xl'>
                        Digital Twin
                    </h1>
                </NavLink>
                
                <HamburgerButton active={active} setActive={activateHamburger}></HamburgerButton>
            </div>
           
            <ul className={`self-center flex-row hidden sm:flex justify-between items-center text-center  ${active||windowSize.innerWidth>=700?`h-auto`:`h-0 hidden` } transition-height duration-500 ease-in`}>
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

            <ul className={`fixed top-0  z-30 w-full  opacity-95 h-screen  bg-gray-700 flex   flex-col justify-center space-y-20 items-center text-center ${active?``:`translate-x-full` }   transition-all duration-500 ease-in`}>
                <li className=' border-b-2 border-white w-full' onClick={()=>{setActive(false)}}>
                    <NavLink to="/map"  className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Map
                    </NavLink>
                </li>
                <li className=' border-b-2 border-white w-full' onClick={()=>{setActive(false)}}>
                    <NavLink to="/store" className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Store
                    </NavLink>
                </li>
                <li className=' border-b-2 border-white w-full' onClick={()=>{setActive(false)}}>
                    <NavLink to="/logs" className={state =>
    "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Logs
                    </NavLink>
                </li>
            </ul>
            
            
        </nav>
    );
}