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
  remove: (id: string) => void;
}

export function TaskComponent({
  title,
  description,
  id,
  selecionada,
  done,
  changeSelect,
  toggleDone,
  remove,
}: TaskProps) {
  return (
    <div
      className={`${done ? "doneTask" : "task"} ${
        selecionada ? "selected" : ""
      }`}
      onClick={() => changeSelect(id)}
    >
      <div>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>

      <Button
        onClick={(event) => {
          event.stopPropagation();
          toggleDone(id);
        }}
      >
        {done ? "Done!" : "Set as done"}
      </Button>

      <button className="delMod"
        onClick={(event) => {
          event.stopPropagation();
          remove(id);
        }}
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </button>
    </div>
  );
}
