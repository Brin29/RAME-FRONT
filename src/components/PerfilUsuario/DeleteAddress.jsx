export const DeleteAddress = ({id}) => {


  const eliminarDireccion = () => {

    const addresId = id;
    const deleteAsk = confirm(`Desea eliminar la direccion con el id: ${addresId}`)

    if (deleteAsk){
      fetch(`http://localhost:8080/v1/directions/${addresId}`, {
        method: "DELETE"
      })
    }
    else{
      return null;
    }

    location.reload()
  }

  return (
  <button onClick={eliminarDireccion}
    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-300 my-2">
        Eliminar
  </button>
  )
}
