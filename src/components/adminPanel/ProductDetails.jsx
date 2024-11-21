import { useState, useEffect } from "react"
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductDetails = ({product}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [productDetails, setProductDetails] = useState(product);


  const handlePopup = () => {
    setOpenPopup(true)
  }

  return (
    <>
      
    {openPopup &&  
      <div className=" z-10 fixed inset-0 flex items-center justify-center bg-stone-100 m-auto w-9/12 h-auto max-h-[90%] rounded-3xl overflow-y-auto">
        
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full dark:hidden"
              src={productDetails.imgPath}
              alt={productDetails.name}
              title={productDetails.name}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl text-black">
              {productDetails.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-black">
                ${productDetails.price}
              </p>

               <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div>Tallas: {productDetails.sizes.map((index, key) => {
                    return (
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" key={key}>
                      {index}
                    </button>
                    )
                  })}</div>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <div>Colores: {productDetails.colors.map((index, key) => {
                return (
                  <button  key={key} className="bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">
                    {index}
                  </button>
                )
              })}</div>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Descripcion: {productDetails.description}
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              Cantidad: {productDetails.quantity}
            </p>
            <div>
              <EditProduct product={product}/>
              <DeleteProduct productId={product.id} productImgName={product.imgName}/>
            </div>
          </div>
        </div>
      </div>

      </div>
    }

      <button className="mr-2 p-2 bg-yellow-500 text-white rounded" 
      onClick={() => handlePopup()}> 
        Ver Detalles
      </button>
    </>

  )
}

export default ProductDetails