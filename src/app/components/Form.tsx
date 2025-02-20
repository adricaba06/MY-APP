import { act, useState } from "react"
import React from 'react'


interface formProps{
    submit: (title: string, description: string, date: string) => void;
}


export default function Form({submit}: formProps) {

    const [values, setValues] = useState({ 
        title: "", 
        description: "",
        date: "",
    });

    const handleInpunt = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target; 
        setValues({
            ...values, 
            [name]: value 
        });

    }

  return (

    <form>
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

        <input className="normal"
        type="text"
        name="date"
        maxLength={94}
        value={values.date}
        onChange={handleInpunt}
        placeholder="Add a Date    ( yyyy-mm-dd )" 
        id="input3"
        />

        <button className="Form-button"  onClick={() => {
            submit(values.title, values.description, values.date);  
        }}>
            submit
        </button>
    </form>
  )
}
