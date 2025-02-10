import { useState } from "react"
import React from 'react'

export default function Form() {

    const [values, setValues] = useState({ //en vez de poner dos useSte hemos puesto solo uno
        title: "", //valores iniciales
        description: ""
    });

    const handleInpunt = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target; //los nuevos valores serán los escritos en el input

        setValues({
            ...values, //esto hace que se mantangan los valores anteriores, es un poco lioso de entender
            [name]: value //se rescriben los valores nuevos
        });

    }

    const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => event.preventDefault(); //la página no se refrescará

  return (

    <form>
        <input
        type="text"
        name="title"
        value={values.title}
        onChange={handleInpunt}
        placeholder="Task Name"
        />

        <input
        type="text"
        name="description"
        value={values.description}
        onChange={handleInpunt}
        placeholder="Add a Description"
        />

        <button>
            submit
        </button>
    </form>
    
  )
}
