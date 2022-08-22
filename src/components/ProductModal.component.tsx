import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Product } from '../pages/store/Product.interface'
import { NamedLabel } from './NamedLabel.component'


export const ProductModal = (props:{product:Product}) => {
    const product:Product=props.product

    const moveToMap = ()=>{
      console.log("Move to map");
    }

  return (
    <div className="flex justify-center items-center  flex-col">
        <div className="bg-white w-fit ">
            <QRCodeSVG value={product.qr_code} size={128}/>
        </div>
        <div className=" rounded mt-8 h-[1px] bg-gray-100 w-11/12"/>
        <div className='flex flex-col my-6 sm:flex-row  items-center justify-between w-9/12 m-4'>
        <NamedLabel description="ID" text={product.id.toString() } styleClasses="text-lg font-bold" blackTheme={true} fullWidth={true}/>
        <NamedLabel description="Created at" text={product.created_at.toString() } styleClasses="text-lg font-bold" blackTheme={true} fullWidth={true}/>

        <NamedLabel description="Position" shortened={false} text={"x:"+product.localization_x.toString()+" y:"+product.localization_y.toString() } styleClasses="text-lg font-bold" blackTheme={true} clickHandler={moveToMap} fullWidth={true}/>
        </div>
        <p className='w-9/12 text-white max-h-64 overflow-hidden hover:overflow-y-scroll text-justify'>
          {product.product_info}
        </p>
        <div className=" rounded my-4 h-[1px] bg-gray-100 w-11/12"/>

        <div className='w-9/12 text-red-600 font-bold flex justify-between'>
          <button>
            Fetch
          </button>
          <button>
            Destroy
          </button>
          <button>
            Check
          </button>
        </div>
    </div>
  )
}
