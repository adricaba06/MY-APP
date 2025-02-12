import { act, useState } from "react"
import React from 'react'


interface formProps{
    submit: (title: string, description: string) => void;
}


export default function Form({submit}: formProps) {

    const [values, setValues] = useState({ 
        title: "", 
        description: ""
    });

    const handleInpunt = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target; 
        setValues({
            ...values, 
            [name]: value 
        });

    }

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
      };

  return (

    <form onSubmit={handleForm}>
        <input
        type="text"
        name="title"
        maxLength={16}
        value={values.title}
        onChange={handleInpunt}
        required placeholder="Task Name"
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
            
        }}>
            submit
        </button>
    </form>
  )
}
