import AddProduct from "./AddProduct";
import products from "../../json/productos.json";
import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import ProductDetails from "./ProductDetails";

const Products = () => {
  const [file, setFile] = useState();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/v1/products")
    .then(res => res.json())
    .then(json => {
      setProduct(json)
      setLoading(false)
    })
    .catch(err => {
      console.error("Error en la imagenes: ", err)
      setLoading(false)
    })
  }, [loading])

  if (loading){
    return <p>Cargando...</p>
  }

  return (
    <>
      <AddProduct file={file} setFile={setFile}/>

      <div className="p-6 flex flex-wrap gap-0">
        {product.map(product => (
                <div
                key={product.id}
                className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <a
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  href="#"
                >
                  <img
                    className="object-cover"
                    src={product.imgPath}
                    alt="product image"
                    title={product.name}
                  />
                </a>
                <div className="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {product.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">
                        {product.price}
                      </span>
                    </p>
                  </div>
                  <div>
                  <ProductDetails product={product}/>
                  <EditProduct product={product} file={file} setFile={setFile}/>
                  <DeleteProduct productImgName={product.imgName} productId={product.id}/>
                  </div>
                </div>
              </div>
        ))
      }

        {products.map((e, index) => {
          return (
            <div
              key={index}
              className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <a
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                href="#"
              >
                <img
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1485145782098-4f5fd605a66b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="product image"
                  title={e.title}
                />
              </a>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">
                    {e.title}
                  </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      {e.price}
                    </span>
                  </p>
                </div>
                <div>
                  <ProductDetails product={e}/>
                  <EditProduct product={e}/>
                  <DeleteProduct/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
