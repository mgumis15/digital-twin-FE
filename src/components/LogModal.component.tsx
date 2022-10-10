import { Log, LogType } from '../interfaces/Log.interface'
import { NamedLabel } from './NamedLabel.component'


export const LogModal = (props:{log:Log}) => {
    
    const log:Log=props.log

    const moveToMap = ()=>{
      console.log("Move to map");
    }


  return (
    <div className="flex justify-center items-center flex-col ">
      <div className="flex justify-center items-center  sm:flex-col w-full">
          <div className='flex flex-col mt-6 sm:flex-row  sm:items-center justify-between w-9/12 m-4'>
          <NamedLabel description="ID" text={log.id.toString() } styleClasses=" font-bold" blackTheme={true}/>
          <NamedLabel description="Product ID" text={log.product_id.toString() } styleClasses=" font-bold" blackTheme={true}/>
    
          <NamedLabel description="Position" shortened={false} text={"x:"+log.localization.x.toString()+" y:"+log.localization.y.toString() } styleClasses=" font-bold" blackTheme={true} clickHandler={moveToMap}/>
          </div>
          <div className='flex flex-col mt-2 sm:flex-row  items-center justify-between w-9/12 m-4'>
          <NamedLabel description="Created at" text={log.created_at.toString() } styleClasses=" font-bold" blackTheme={true}/>
          <NamedLabel description="Type" text={LogType[log.type] } styleClasses=" font-bold" blackTheme={true}/>
          </div>

          
      </div>
      <div className=" rounded my-4 h-[1px] bg-gray-100 w-11/12"/>
    </div>
  )
}
