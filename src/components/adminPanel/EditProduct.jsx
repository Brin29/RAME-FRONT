import { useState } from "react"

const EditProduct = ({ product }) => {
  const [file, setFile] = useState(null)
  const [editProduct, setEditProduct] = useState(product)
  const [openPopup, setOpenPopup] = useState(false)

  const prevFileName = editProduct.imgName;

  const onClickEditHandler = () => {
    setOpenPopup(true)
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleImgChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevData) => ({
      ...prevData,
      [name]: parseFloat(value) || 0
    }))
  }

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value.split(",").map(item => item.trim())
    }));
  };

  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setEditProduct(prev => {
      const sizes = prev.size;
      if (checked) {
        return { ...prev, size: [...sizes, name] };
      } else {
        return {
          ...prev, size: sizes.filter(size => size !== name)
        }
      }
    })
  }

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      discount: value === "yes" ? true : false
    }));
  }

  const sendData = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("file", file)
    formData.append('newProductJSON', JSON.stringify(editProduct));

    const configuration = {
      method: "PUT",
      body: formData
    }

    fetch(`http://localhost:8080/v1/products/${prevFileName}/${editProduct.id}`, configuration)
      .then(res => res.json())
      .then(json => console.log(json))

    location.reload();
  }

  return (
    <>
      <button
        className="mr-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition duration-200"
        onClick={onClickEditHandler}
      >
        Editar
      </button>

      {openPopup &&
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded-3xl shadow-lg overflow-y-auto h-[80vh]">
            <form onSubmit={sendData}>
              <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                Editar Producto
              </h2>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
                {/* Nombre */}
                <div className="sm:col-span-1">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="productName"
                    required
                    value={editProduct.name || ""}
                    onChange={handleTextChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Precio */}
                <div className="sm:col-span-1">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={editProduct.price || ""}
                    onChange={handleNumberChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Imagen */}
                <div className="sm:col-span-1">
                  <label htmlFor="addImg" className="block text-sm font-medium text-gray-700">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    id="addImg"
                    onChange={handleImgChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Descripción */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    required
                    value={editProduct.description || ""}
                    onChange={handleTextChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Color */}
                <div className="sm:col-span-2">
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    id="color"
                    value={editProduct.color || ""}
                    onChange={handleArrayChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Cantidad */}
                <div className="sm:col-span-1">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={editProduct.quantity || ""}
                    onChange={handleNumberChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Categoría */}
                <div className="sm:col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={editProduct.category || ""}
                    onChange={handleTextChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="camisa">Camisa</option>
                    <option value="falda">Falda</option>
                    <option value="vestido">Vestido</option>
                  </select>
                </div>

                {/* Talla */}
                <div className="sm:col-span-2">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Talla</legend>
                    <div className="mt-2 flex gap-x-6">
                      <div className="flex items-center">
                        <input id="l" name="l" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600" onChange={handleSizeChange} />
                        <label htmlFor="l" className="ml-2 text-sm text-gray-700">L</label>
                      </div>
                      <div className="flex items-center">
                        <input id="s" name="s" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600" onChange={handleSizeChange} />
                        <label htmlFor="s" className="ml-2 text-sm text-gray-700">S</label>
                      </div>
                      <div className="flex items-center">
                        <input id="m" name="m" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600" onChange={handleSizeChange} />
                        <label htmlFor="m" className="ml-2 text-sm text-gray-700">M</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                {/* Descuento */}
                <div className="sm:col-span-2">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Descuento</legend>
                    <div className="mt-2 flex gap-x-6">
                      <div className="flex items-center">
                        <input id="yesDiscount" name="discount" type="radio" value="yes" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600" onChange={handleDiscountChange} />
                        <label htmlFor="yesDiscount" className="ml-2 text-sm text-gray-700">Sí</label>
                      </div>
                      <div className="flex items-center">
                        <input id="noDiscount" name="discount" type="radio" value="no" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600" onChange={handleDiscountChange} />
                        <label htmlFor="noDiscount" className="ml-2 text-sm text-gray-700">No</label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                  onClick={() => setOpenPopup(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default EditProduct;
