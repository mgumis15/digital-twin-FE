export interface   NamedLabelProps{
    description:string
    text:string
    styleClasses?:string
    blackTheme?:boolean
    shortened?:boolean
    clickHandler?:Function
    fullWidth?:boolean
} 
export const NamedLabel = ({description, text,blackTheme=false, styleClasses='',shortened=true,clickHandler=undefined,fullWidth=false}:NamedLabelProps)=>{

    return(
        <div className={`flex flex-col ${fullWidth?"max-w-full":"max-w-[70%]"} p-1 ${clickHandler?'border-b-2 box-border border-sky-500 cursor-pointer':''}  rounded`} onClick={()=>{
            if(clickHandler)clickHandler()
        }}>
            <p className={`${blackTheme?"text-gray-100":"text-gray-500"} text-left text-xs leading-3 w-full`}>{description}</p>
            <p className={`break-words ml-2 mt-0 leading-5 text-lg  overflow-hidden ${shortened?"text-ellipsis":""} max-h-5 whitespace-nowrap ${blackTheme?"text-white":"text-black"} ${styleClasses}`}>{text}</p>
        </div>
    )
}