import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo_bg.png'
import { HamburgerButton } from './HamburgerButton.component'

function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
}

export const Navbar = (): JSX.Element => {
    const [active, setActive] = useState<boolean>(false)
    const [windowSize, setWindowSize] = useState(getWindowSize())
    const [mapMenuOpen, setMapMenuOpen] = useState(false)

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize())
            if (getWindowSize().innerWidth > 700) {
                setActive(false)
            }
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const activateHamburger = () => {
        setActive(prev => !prev)
    }

    return (
        <nav className={`bg-wgite border-gray-300 px-2 sm:px-4 py-3 dark:bg-gray-700  flex sm:flex-wrap flex-col sm:flex-row justify-center items-center mx-auto sticky w-full z-20`}>
            <div className='sm:absolute left-4 flex flex-row w-11/12 sm:w-auto justify-between'>
                <NavLink to="/" className=' flex h-full text-4xl justify-between items-center space-x-4'>
                    <img src={logo} alt="logo" className='w-12 rounded-xl outline outline-sky-500' />
                    <h1 className='text-white hidden md:block text-3xl'>
                        Digital Twin
                    </h1>
                </NavLink>

                <HamburgerButton active={active} setActive={activateHamburger}></HamburgerButton>
            </div>

            <ul className={`self-center flex-row hidden sm:flex justify-between items-center text-center  ${active || windowSize.innerWidth >= 700 ? `h-auto` : `h-0 hidden`}`}>
                <li className={`navlinkText flex relative ${mapMenuOpen ? `rounded-b-none bg-gray-600` : `rounded`}`} onMouseEnter={() => { setMapMenuOpen(true) }} onMouseLeave={() => { setMapMenuOpen(false) }}>
                    <div className='flex flex-row space-x-1'>
                        <p >Maps </p>
                        <p className={`${mapMenuOpen ? `rotate-90` : `rotate-0`}  transition-transform duration-300 ease-in`}> &#10148;</p>
                    </div>
                    <ul className={`w-full absolute left-0 top-10 ${mapMenuOpen ? `h-auto duration-300 opacity-1 transition-all` : `h-0 opacity-0 duration-0 transition-none`} 
                dark:bg-gray-600   ease-in`}>
                        <li>
                            <NavLink to="/maps/map2D" className={state =>
                                "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                                2D Map
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/maps/map3D" className={state =>
                                "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                                3D Map
                            </NavLink>
                        </li>
                    </ul>
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

            <ul className={`fixed top-0  z-30 w-full  opacity-95 h-screen  bg-gray-700 flex   flex-col justify-center space-y-14 items-center text-center ${active ? `` : `translate-x-full`}   transition-all duration-500 ease-in`}>
                <li className='h-auto p-0  w-full navlinkText relative ' onClick={() => { setMapMenuOpen(prev => !prev) }}>
                    <p className='h-[40px] leading-10 border-b-2 border-white w-full'>Maps</p>
                    <p className={`absolute top-5 right-4 -translate-y-1/2 ${mapMenuOpen ? `rotate-90` : `rotate-0`} transition-transform duration-100 ease-in`}> &#10148;</p>
                    <ul className={`w-full ${mapMenuOpen ? `h-auto duration-300 opacity-1 transition-all` : `h-0 opacity-0 duration-0 transition-none hidden`} 
                dark:bg-gray-600   ease-in`}>
                        <li className=' border-b-2 border-white w-full' onClick={() => { setActive(false) }}>
                            <NavLink to="/maps/map2D" className={state =>
                                "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                                2D Map
                            </NavLink>
                        </li>
                        <li className=' border-b-2 border-white w-full' onClick={() => { setActive(false) }}>
                            <NavLink to="/maps/map3D" className={state =>
                                "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                                3D Map
                            </NavLink>
                        </li>
                    </ul>
                </li>


                <li className=' border-b-2 border-white w-full' onClick={() => { setActive(false) }}>
                    <NavLink to="/store" className={state =>
                        "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Store
                    </NavLink>
                </li>
                <li className=' border-b-2 border-white w-full' onClick={() => { setActive(false) }}>
                    <NavLink to="/logs" className={state =>
                        "navlinkText" + (state.isActive ? " navlinkTextActive" : "")}>
                        Logs
                    </NavLink>
                </li>
            </ul>


        </nav>
    )
}