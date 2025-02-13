"use client";

import Button from "./components/button";  
import Form from "./components/Form";
import { TaskComponent } from "./components/task";     
import PopUp from "./components/popUp";
import { useState, useEffect } from "react";
import { Task } from "./components/task";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [taskList, setTaskList] = useState<Array<Task>>([]);

  const addTask = (title: string, description: string, selecionada: boolean) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      selecionada,
      done: false,  // Nueva tarea comienza como no completada
    };

    setTaskList([...taskList, newTask]);
  };

  const deleteTask = () => {
    setTaskList(taskList.filter(task => !task.selecionada));
  };

  let deleteCurrentTask = (id: string) =>{
    let indice = -1;
    for(let i = 0; i<taskList.length; i++){
      if(taskList[i].id === id){
        indice = i;
      }
      const updatedTaskList = [
        ...taskList.slice(0, indice),  
        ...taskList.slice(indice + 1)
      ];
      
      setTaskList(updatedTaskList);
    }
  } 

  const toggleDone = (id: string) => {
    setTaskList(taskList.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };


  enum Filter {
    All,
    Done,
    NotDone
  }
  const [filter, setFilter] = useState<Filter>(Filter.All);

  function filterList(tasks: Task[], filter: Filter): Task[] {
    switch (filter) {
      case Filter.All:
        return tasks;
      case Filter.Done:
        return tasks.filter(task => task.done === true);
      case Filter.NotDone:
        return tasks.filter(task => task.done === false);
      default:
        throw new Error("Invalid filter");
    }
  }

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(taskList);

  useEffect(() => {
    setFilteredTasks(filterList(taskList, filter));
  }, [taskList, filter]);

  /*Mostrar Lista------------------------------------------------*/
  const showList = () => filteredTasks.map(task => (
    <TaskComponent
      key={task.id}
      {...task}
      changeSelect={id =>
        setTaskList(taskList.map(task =>
          task.id === id ? { ...task, selecionada: !task.selecionada } : task
        ))
      }
      toggleDone={toggleDone}  // Pasamos toggleDone al componente TaskComponent
      remove={id => deleteCurrentTask(id)}
    />
  ));
  /*Mostrar Lista------------------------------------------------*/

  const [visible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(!visible);

  const handleSubmit = (title: string, description: string) => {
    addTask(title, description, false);
    changeVisibility();
  };

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="contenidoPrincipal">
            <aside>
              <div>
                <div className="filtros">
                  <Button onClick={() => changeVisibility()}>
                    <p>New Task</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                  </Button>

                  <Button onClick={deleteTask}>Eliminar tarea</Button>
                </div>
                <PopUp isVisible={visible}>
                  <Form submit={handleSubmit} />
                </PopUp>

                {/* Botones para cambiar el filtro */}
                <div className="filtros">
                  <Button onClick={() => setFilter(Filter.All)}>Todas</Button>
                  <Button onClick={() => setFilter(Filter.Done)}>Completadas</Button>
                  <Button onClick={() => setFilter(Filter.NotDone)}>Pendientes</Button>
                </div>
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
