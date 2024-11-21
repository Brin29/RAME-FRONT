const DeleteProduct = ({productId, productImgName}) => {

  const id = productId;
  const imgName = productImgName;
  
  const deleteProduct = () => {
    const deleteAsk = confirm(`Desea borrar el producto con el id: "${id}"`)

    if (deleteAsk){
      fetch(`http://localhost:8080/v1/products/${imgName}/${id}`, {
        method: "DELETE"
      })
    }
    else {
      return null;
    }

    location.reload();
  }

  return (
    <button className="p-2 bg-red-500 text-white rounded" onClick={deleteProduct}>
      Eliminar
    </button>
  )
}

export default DeleteProduct;
