"use client";

import Button from "./components/button";  // Importación de Button
import Form from "./components/Form";
import {TaskComponent} from "./components/task";      // Importación de Task
import PopUp from "./components/popUp";
import { useState } from "react";
import { TaskProps, Task } from "./components/task";
import { v4 as uuidv4 } from "uuid";


export default function Home() {

  const [taskList, setTaskList] = useState<Array<Task>>([{
    id:"1",
    title: "Tarea",
    description: "Hacer mates",
    selecionada: false,
    
  }]);

  

  const addTask = (title: string, description: string, selecionada: boolean) => {

    const newTask = {
      id: uuidv4(),
      title,
      description,
      selecionada,
      
    };

    setTaskList([...taskList, newTask]);
  };

  let deleteTask = () => {
    const updatedTaskList = taskList.filter(task => !task.selecionada);
    setTaskList(updatedTaskList);
  }

  const showList = () => taskList.map((task) => (<TaskComponent key={task.id} {...task} changeSelect={id => setTaskList(taskList.map(task => task.id === id ? {...task, selecionada : ! task.selecionada} : task))} />));
  

  const getSelectedTarget = () => {
    for(let i = 0; i<taskList.length; i++){
      if(taskList[i].selecionada){
        return true;
      }else{
        return false;
      }
    }

  }

    const [visible, setVisible] = useState(false);
    const changeVisibility = () => setVisible(!visible);

    const handleSubmit = (title: string, description: string) => {
      addTask(title, description,false);
      changeVisibility();
    }


    return (
      <>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

            <div className="contenidoPrincipal">
              <aside>
                <div>
                 
                  <Button onClick={() => changeVisibility()}>
                    <p>New Task</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                  </Button>

                  <Button onClick={deleteTask}>
                      Eliminar tarea
                  </Button>



                  <PopUp isVisible={visible}>
                  <Form submit={handleSubmit} /> //revisar
                  </PopUp>
                
                </div>

              </aside>

              <section>

                <h1>Task Manager</h1>
                <div className="recuadroTareas">
                  {showList()}
                </div>
              </section>

            </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <p>© 2025 Tu Nombre. Todos los derechos reservados.</p>
          </footer>
        </div>

      </>

    );
  }
