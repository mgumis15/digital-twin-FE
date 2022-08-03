export const NamedLabel = (props:{description:string, text:string, styleClasses?:string})=>{
    const description:string=props.description
    const text:string=props.text
    const styleClasses:string|undefined=props.styleClasses
    return(
        <div className="flex flex-col w-fit">
            <p className="text-gray-500 text-left text-xs leading-3">{description}</p>
            <p className={`break-words ml-2 mt-0 leading-5 ${styleClasses}`}>{text}</p>
        </div>
    )
}