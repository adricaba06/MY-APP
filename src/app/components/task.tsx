import React, { useState } from 'react'
import Button from './button';


export interface Task {
  title: string;
  description: string;
  id: string;
  selecionada: boolean;

}

export interface TaskProps extends Task{
  changeSelect: (id: string) => void;
}


const changeSelectionfromTask = ({selecionada}: TaskProps): void => {
  selecionada = true;
}

export function TaskComponent({ title, description, id, selecionada, changeSelect}: TaskProps) { // recordar poner las props

  const [done, setDone] = useState(true); //¿como usar useSte? primero voy a poner esto
  const changeDone = () => setDone(!done);

 // const [selected, setSelected] = useState(false);
 // const changeSelection = () => setSelected(!selected);

  return (
    <div className={`${done ? 'task' : 'doneTask'} ${selecionada ? 'selected' : ''}`} 
      onClick={()=> changeSelect(id)}>
      <div>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
       
      <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Evita activar el click del div, lo he visto en internet
        changeDone();
      }}>
    
      {done ? "Set as done" : "Done !"}
    </Button>
      </div>
  );
};
