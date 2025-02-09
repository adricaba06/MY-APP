import { title } from "process"
import { useState } from "react"

import React from 'react'

export default function Form() {

    const [values, setValues] = useState({
        title: '',
        description: '',
    });

    const handleInpunt = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{ //he tenido que buscar esto en internet
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        event.preventDefault();
        console.log(values);
    }

  return (
    <form>
        <input
        type="text"
        name="title"
        value = {values.title}
        placeholder="Task Name"
        onChange={handleInpunt}>

        </input>

        <input
        type="text"
        name="description"
        value = {values.description}
        placeholder="Description..."
        onChange={handleInpunt}>

        </input>



    </form>
  )
}
