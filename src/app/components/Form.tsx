import { act, useState } from "react"
import React from 'react'


interface formProps{
    submit: (title: string, description: string) => void;
    onClick: () => void;
}


export default function Form({submit, onClick}: formProps) {

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

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Esto evitará que la página se recargue
      };

  return (

    <form onSubmit={handleForm}>
        <input
        type="text"
        name="title"
        maxLength={16}
        value={values.title}
        onChange={handleInpunt}
        placeholder="Task Name"
        id="input1"
        />

        <input
        type="text"
        name="description"
        maxLength={94}
        value={values.description}
        onChange={handleInpunt}
        placeholder="Add a Description"
        id="input2"
        />

        <button className="Form-button"  onClick={() => {
            submit(values.title, values.description);  
            onClick();  // Llama a la otra función
        }}>
            submit
        </button>
    </form>
  )
}
