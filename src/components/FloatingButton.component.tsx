import { ReactComponent as TruckSolid } from '../assets/images/truck-solid.svg'

export const FloatingButton = (props: { handler: Function }) => {
    return (
        <button className="fixed rounded-full w-14 h-14 right-4 bottom-4 sm:right-24 sm:bottom-24 bg-sky-400 "
            onClick={() => props.handler()}
        >
            <TruckSolid className='relative left-1/2 -translate-x-1/2  scale-90 fill-white cursor-pointer shadow-xl transition-colors h-8 hover:animate-pulse' />
        </button>
    )
}