import { useState } from "react";

const AddProduct = () => {
  const [file, setFile] = useState();
  const [openPopup, setOpenPopup] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: null,
    discount: null,
    category: "",
    imgPath: "",
    imgName: "",
    colors: [],
    sizes: [],
    description: "",
    quantity: null
  });

  const newProductHandler = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImgChange = e => {
    setFile(e.target.files[0]);
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value.split(",").map(item => item.trim())
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSizeChange = (e) => {
    const { name, checked } = e.target;
    setNewProduct(prev => {
      const sizes = prev.sizes;
      if (checked) {
        return { ...prev, sizes: [...sizes, name] };
      } else {
        return {
          ...prev, sizes: sizes.filter(size => size !== name)
        };
      }
    });
  };

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      discount: value === "yes" ? true : false
    }));
  };

  const addProductApi = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append('newProductJSON', JSON.stringify(newProduct));

    const configuration = {
      method: "POST",
      body: formData
    };

    fetch(`http://localhost:8080/v1/add-product`, configuration)
      .then(res => console.log(res))
      .then(json => console.log(json));

    location.reload();
  };

  return (
    <>
      {openPopup &&
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-stone-100 m-auto w-9/12 h-auto max-h-[90%] rounded-3xl overflow-y-auto">
          <form className="w-full h-full p-6 bg-white rounded-xl" onSubmit={addProductApi}>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Añadir un nuevo producto
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-1">
                  <label htmlFor="productName" className="block text-gray-700">Nombre del Producto</label>
                  <input
                    type="text"
                    name="name"
                    id="productName"
                    value={newProduct.name || ""}
                    onChange={newProductHandler}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="price" className="block text-gray-700">Precio</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={newProduct.price || ""}
                    onChange={handleNumberChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="addImg" className="block text-gray-700">Imagen</label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  id="addImg"
                  onChange={handleImgChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700">Descripción</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={newProduct.description || ""}
                  onChange={newProductHandler}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-gray-700">Color</label>
                <input
                  type="text"
                  name="colors"
                  id="color"
                  value={newProduct.colors || ""}
                  onChange={handleArrayChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-gray-700">Cantidad</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={newProduct.quantity || ""}
                  onChange={handleNumberChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-gray-700">Categoría</label>
                <select
                  id="category"
                  name="category"
                  onChange={newProductHandler}
                  className="w-full p-2 border rounded"
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="camisa">Camisa</option>
                  <option value="falda">Falda</option>
                  <option value="vestido">Vestido</option>
                </select>
              </div>

              <div className="mt-6 space-y-6">
                <fieldset>
                  <legend className="text-sm font-semibold">Talla</legend>
                  <div className="flex gap-x-4">
                    <div>
                      <input type="checkbox" id="l" name="l" onChange={handleSizeChange} />
                      <label htmlFor="l">L</label>
                    </div>
                    <div>
                      <input type="checkbox" id="s" name="s" onChange={handleSizeChange} />
                      <label htmlFor="s">S</label>
                    </div>
                    <div>
                      <input type="checkbox" id="m" name="m" onChange={handleSizeChange} />
                      <label htmlFor="m">M</label>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-semibold">Descuento</legend>
                  <div className="flex gap-x-4">
                    <div>
                      <input type="radio" id="yesDiscount" name="discount" value="yes" onChange={handleDiscountChange} />
                      <label htmlFor="yesDiscount">Sí</label>
                    </div>
                    <div>
                      <input type="radio" id="noDiscount" name="discount" value="no" onChange={handleDiscountChange} />
                      <label htmlFor="noDiscount">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="flex justify-end mt-6 gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  onClick={() => setOpenPopup(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      }

      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setOpenPopup(true)}
      >
        Añadir Producto
      </button>
    </>
  );
};

export default AddProduct;