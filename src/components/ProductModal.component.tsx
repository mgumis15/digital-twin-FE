import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Product } from '../interfaces/Product.interface'
import { NamedLabel } from './NamedLabel.component'
import { TruckIcon } from './TruckIcon.component'


export const ProductModal = (props: { product: Product }) => {
  const product: Product = props.product

  const moveToMap = () => {
    console.log("Move to map")
  }

  return (
    <div className="flex justify-center items-center  flex-col max-h-[90%] min-w-[240px] ">
      <div className="bg-white w-fit ">
        <QRCodeSVG value={product.qr_code} size={128} />
      </div>
      <div className=" rounded mt-8 h-[1px] bg-gray-100 w-11/12" />
      <div className='flex mt-6 sm:flex-row  sm:items-center justify-between w-9/12 m-4'>
        <NamedLabel description="ID" text={product.id.toString()} styleClasses="font-bold" blackTheme={true} />

        <NamedLabel description="Position" shortened={false} text={"x:" + product.localization.x.toString() + " y:" + product.localization.y.toString()} styleClasses="font-bold" blackTheme={true} clickHandler={moveToMap} />
      </div>
      <div className='flex flex-col mt-2 sm:flex-row items-end sm:items-center justify-between w-9/12 m-4'>
        <NamedLabel description="Created at" text={product.created_at.toString()} styleClasses="font-bold" blackTheme={true} />

        <NamedLabel description="Updated at" text={product.updated_at.toString()} styleClasses="font-bold" blackTheme={true} />
      </div>
      <p className='w-9/12 text-white max-h-64 overflow-auto scroll-smooth text-justify'>
        {product.product_info}
      </p>
      <div className=" rounded my-4 h-[1px] bg-gray-100 w-11/12" />

      <div className='w-9/12 text-red-600 font-bold flex justify-between'>
        <TruckIcon type="Destroy" handler={() => { console.log("Destroy") }}></TruckIcon>
        <TruckIcon type="Fetch" handler={() => { console.log("Fetch") }}></TruckIcon>
        <TruckIcon type="Check" handler={() => { console.log("Check") }}></TruckIcon>
      </div>
    </div>
  )
}
