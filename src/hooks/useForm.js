import { useState } from "react";

const useForm = (initialData, onValidate, onSuccess, api) => {

    const [form, setForm] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]); 

    const handleChange = e => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value})
    }


    const handleSubmit = async e => {
        e.preventDefault();
        const err = onValidate(form);
        setErrors(err)

        if (Object.keys(err).length === 0){
          setLoading(true);
        }
        else{
          return null;
        }
 
    
        try {
          const response = await fetch(api, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
          });
          
          if (!response.ok) {
            throw new Error("Error en la solicitud de registro");
          }
    
          const json = await response.json();
          localStorage.removeItem("token");
          localStorage.setItem("token", json.token);
          console.log("Registro exitoso:", json);
          
          if (onSuccess) onSuccess(); 
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };

      return {form, errors, loading, handleChange, handleSubmit }
}

export default useForm;