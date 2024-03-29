import { useState } from "react"
export const HamburgerButton = (props: { active: boolean, setActive: Function }) => {

    const [hover, setHover] = useState<Boolean>(false)
    return (
        <button className="w-10 h-10 relative top-1 z-40 sm:hidden" onClick={() => { props.setActive() }} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
            <div className="flex items-end w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                <div className={`block absolute w-6 h-0.5 transform transition duration-500 ease-in-out bg-gray-300 ${props.active ? `rotate-45` : `-translate-y-1.5 `} 
                    ${(hover && !props.active) ? `scale-x-100` : ``} `} ></div>
                <div className={`block absolute w-6 h-0.5 transform transition duration-500 ease-in-out bg-gray-300  ${props.active ? `opacity-0` : ``} ${(hover && !props.active) ? `scale-x-100` : `scale-x-75`} `} ></div>
                <div className={`block absolute w-6 h-0.5 transform transition duration-500 ease-in-out bg-gray-300 ${(hover && !props.active) ? `scale-x-100` : ``}
                    ${props.active ? `-rotate-45 scale-x-100` : `translate-y-1.5 `}
                     `}></div>
            </div>
        </button>
    )

}