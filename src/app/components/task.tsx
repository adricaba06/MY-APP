import React from "react";
import Button from "./button";

export interface Task {
  title: string;
  description: string;
  id: string;
  selecionada: boolean;
  done: boolean;

}

export interface TaskProps extends Task {
  changeSelect: (id: string) => void;
  toggleDone: (id: string) => void;
}

export function TaskComponent({ 
  title, 
  description, 
  id, 
  selecionada, 
  done, 
  changeSelect, 
  toggleDone, 

}: TaskProps) {

  return (
    <div className={${done ? "doneTask" : "task"} ${selecionada ? "selected" : ""}} 
      onClick={() => changeSelect(id)}>

      <div>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>

      <Button onClick={(event) => {
        event.stopPropagation(); 
        toggleDone(id); 
      }}>
        {done ? "Done!" : "Set as done"}
      </Button>
    </div>
  );
}