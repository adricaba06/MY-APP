import { title } from 'process';
import React, { useState } from 'react'
import Button from './button';



interface taskProps{
    title: string;
    description: string;
    
}

export default function Task({title, description}: taskProps) { // recordar poner las props

    const[done, setDone] = useState(true); //¿como usar useSte? primero voy a poner esto

    //ahora vamos a crear la funcion que va a hacer que el estado cambie

    const changeDone = () => setDone(!done);

  return (
     <div className={done? 'task' : 'doneTask'}>
            <div>
                <h2>{title}</h2>
                <h4>{description}</h4>
                
            </div>
            <Button contenido={done? "Set as done" : "Done !"} onClick={changeDone}></Button>

    </div>
  )
}
