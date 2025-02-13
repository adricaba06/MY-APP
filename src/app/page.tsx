"use client";

import Button from "./components/button";  
import Form from "./components/Form";
import { TaskComponent } from "./components/task";     
import PopUp from "./components/popUp";
import { useState, useEffect } from "react";
import { Task } from "./components/task";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [taskList, setTaskList] = useState<Array<Task>>([
    {
      id: "1",
      title: "Tarea de ejemplo",
      description: "Esta es una tarea por defecto",
      selecionada: false,
      done: false
    }
  ]);

  const addTask = (title: string, description: string, selecionada: boolean) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      selecionada,
      done: false,  
    };

    setTaskList([...taskList, newTask]);
  };

  const deleteTask = () => {
    setTaskList(taskList.filter(task => !task.selecionada));
  };

  let modifyCurrentTask = (id: string, newTitle: string, newDescription: string) => {
    setTaskList(
      taskList.map(task => task.id === id
        ? { ...task, title: newTitle, description: newDescription } : task
      )
    );
  };

  const handlemodification = (id: string, newTitle: string, newDescription: string) => {
    changevispop2(); // Abre el PopUp de edición
    setCurrentTask({ id, title: newTitle, description: newDescription }); // Asigna los valores a los inputs
  };

  let deleteCurrentTask = (id: string) => {
    let indice = -1;
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === id) {
        indice = i;
      }
      const updatedTaskList = [
        ...taskList.slice(0, indice),
        ...taskList.slice(indice + 1)
      ];

      setTaskList(updatedTaskList);
    }
  };

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

  const showList = () => filteredTasks.map(task => (
    <TaskComponent
      key={task.id}
      {...task}
      changeSelect={id =>
        setTaskList(taskList.map(task =>
          task.id === id ? { ...task, selecionada: !task.selecionada } : task
        ))
      }
      toggleDone={toggleDone}
      remove={id => deleteCurrentTask(id)}
      modify={id => handlemodification(id, task.title, task.description)} // Aqui paso la tarea para modificar
    />
  ));

  const [vispop2, setvispop2] = useState(false);
  const changevispop2 = () => setvispop2(!vispop2);

  const [visible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(!visible);

  //ESTADO PARA EL PUÑETERO FORMULARIO
  const [currentTask, setCurrentTask] = useState<{ id: string, title: string, description: string }>({
    id: '',
    title: '',
    description: ''
  });

  const handleSubmit = (title: string, description: string) => {
    addTask(title, description, false);
    changeVisibility();
  };

  const handleEditSubmit = (title: string, description: string) => {
    modifyCurrentTask(currentTask.id, title, description); 
    changevispop2(); 
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

                {/* PopUp para agregar tarea */}
                <PopUp isVisible={visible}>
                  <Form submit={handleSubmit} />
                </PopUp>

                {/* PopUp para modificar tarea, tiene formulario normal, no el mio */} 
                <PopUp isVisible={vispop2}> {/*he visto esto en un video*/}
                  <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(currentTask.title, currentTask.description); }}>
                    <input 
                      type="text" 
                      value={currentTask.title} 
                      onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })} 
                    />
                    <input 
                      type="text" 
                      value={currentTask.description} 
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })} 
                    />
                    <button type="submit" className="Form-button">Guardar cambios</button>
                  </form>
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
        <footer className="footer">
          <p>© 2025 Adrián Caballero Torrebejano. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
