"use client";

import Button from "./components/button";
import Form from "./components/Form";
import { TaskComponent } from "./components/task";
import PopUp from "./components/popUp";
import { useState, useEffect } from "react";
import { Task } from "./components/task";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar"; // Importar react-big-calendar
import "react-big-calendar/lib/css/react-big-calendar.css"; // Estilos de React Big Calendar

const localizer = momentLocalizer(moment);

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  // useEffect para cargar las tareas desde la API
  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await fetch("/api/todos");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        setTaskList(data);
      } catch (error) {
        console.error("Error al obtener las tareas", error);
      }
    };

    fetchTaskList();
  }, []);

  useEffect(() => {
    console.log("Task List Updated:", taskList);
  }, [taskList]);

  const deleteTask = async () => {
    if (taskList.some((task) => task.selecionada === true)) {
      //some revisa si al menos una de la stareas esta seleccionada
      taskList.forEach(async (task) => {
        // ya que no puedo usar map
        if (task.selecionada === true) {
          try {
            const response = await fetch("/api/todos/deleteTask", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: task.id }),
            });

            if (!response.ok) {
              console.error("Error eliminando la tarea con id:", task.id);
            } else {
              console.log("Tarea eliminada con éxito:", task.id);
              window.location.reload(); // lo he buscado en google
            }
          } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
          }
        }
      });
    }
  };

  let modifyCurrentTask = async (
    id: number,
    newTitle: string,
    newDescription: string,
    newDate: string
  ) => {
    try {
      const response = await fetch("/api/todos/modifyTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: newTitle,
          description: newDescription,
          date: newDate,
        }),
      });

      if (!response.ok) {
        //si la respuesta no es correcta
        console.error("Error modificando la tarea con id:", id);
      } else {
        console.log("Tarea modificada con éxito:", id);

        // Actualiza el estado de la lista de tareas directamente en el frontend
        setTaskList((prevTasks) => {
          return prevTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title: newTitle,
                  description: newDescription,
                  date: newDate,
                } // Modifica la tarea con el 'id' correspondiente
              : task
          );
        });
      }
    } catch (error) {
      console.error("Error en la solicitud MODIFY:", error);
    }
  };

  const handlemodification = (
    id: number,
    newTitle: string,
    newDescription: string,
    newDate: string
  ) => {
    changevispop2(); // Abre el PopUp de edición
    setCurrentTask({
      id,
      title: newTitle,
      description: newDescription,
      date: newDate,
    }); // Asigna los valores a los inputs
  };

  let deleteCurrentTask = async (id: number) => {
    try {
      const response = await fetch("/api/todos/deleteTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.error("Error eliminando la tarea con id:", id);
      } else {
        console.log("Tarea eliminada con éxito:", id);
        setTaskList(taskList.filter((task) => task.id !== id));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };

  const toggleDone = async (id: number) => {
    // Obtener el estado actualizado antes de modificarlo
    const updatedTaskList = taskList.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    setTaskList(updatedTaskList); // Actualizar el frontend inmediatamente

    try {
      const response = await fetch("http://localhost:3000/api/todos/done", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          done: updatedTaskList.find((task) => task.id === id)?.done,
        }),
      });

      if (!response.ok) {
        console.error("Error al cambiar el estado de la tarea");
        // Si falla, revertir el cambio
        setTaskList(taskList);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // En caso de error, revertir el cambio
      setTaskList(taskList);
    }
  };

  enum Filter {
    All,
    Done,
    NotDone,
    name,
  }

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [search, setSearch] = useState("");

  function filterList(tasks: Task[], filter: Filter): Task[] {
    switch (filter) {
      case Filter.All:
        return tasks;
      case Filter.Done:
        return tasks.filter((task) => task.done === true);
      case Filter.NotDone:
        return tasks.filter((task) => task.done === false);
      case Filter.name:
        return tasks.filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase())
        );
      default:
        throw new Error("Invalid filter");
    }
  }

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(taskList);
  console.log(filteredTasks, taskList);
  useEffect(() => {
    setFilteredTasks(filterList(taskList, filter));
  }, [taskList, filter]);

  const showList = () =>
    filteredTasks.map((task) => (
      <TaskComponent
        key={task.id}
        {...task}
        changeSelect={(id) =>
          setTaskList(
            taskList.map((task) =>
              task.id === id
                ? { ...task, selecionada: !task.selecionada }
                : task
            )
          )
        }
        toggleDone={toggleDone}
        remove={(id) => deleteCurrentTask(id)}
        modify={(id) =>
          handlemodification(id, task.title, task.description, task.date)
        } // Aqui paso la tarea para modificar
      />
    ));

  const [vispop2, setvispop2] = useState(false); //vista del segundo popUp
  const changevispop2 = () => setvispop2(!vispop2);

  const [visible, setVisible] = useState(false);
  const changeVisibility = () => setVisible(!visible);

  //ESTADO PARA EL PUÑETERO FORMULARIO
  const [currentTask, setCurrentTask] = useState<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>({
    id: 0,
    title: "",
    description: "",
    date: "",
  });

  const addTask = async (title: string, description: string, selecionada: boolean, date: string) => {
    const newTask: Omit<Task, "id"> = {
      title,
      description,
      selecionada,
      done: false,
      date,
    };
  
    try {
      const response = await fetch("/api/todos/addTask", {
        method: "POST", // Asegúrate de que sea POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
  
      if (response.ok) {
        const createdTask = await response.json();
        console.log("Tarea creada:", createdTask);
        setTaskList([...taskList, createdTask]);
      } else {
        const errorData = await response.json();
        console.error("Error al añadir la tarea:", errorData);  // Verificar el error detallado
      }
    } catch (error) {
      console.error("Error al añadir la tarea", error);
    }
  };

  const handleSubmit = (title: string, description: string, date: string) => {
    addTask(title, description, false, date);
    changeVisibility();
  };

  const handleEditSubmit = (
    title: string,
    description: string,
    date: string
  ) => {
    modifyCurrentTask(currentTask.id, title, description, date);
    changevispop2();
  };

  // Convertir las tareas en eventos compatibles con react-big-calendar
  const events = taskList.map((task) => ({
    title: task.title,
    start: new Date(task.date),
    end: new Date(task.date),
    allDay: true,
  }));

  console.log("Events:", events);

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="contenidoPrincipal">
            <aside>
              <div>
                {/*Crud*/}
                <div className="principales">
                  <Button onClick={() => changeVisibility()}>
                    <span className="onlyIcon">New Task </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                    </svg>
                  </Button>

                  <Button onClick={deleteTask}>
                    <span className="onlyIcon">Delete Task </span>
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
                  </Button>
                </div>

                {/* PopUp para agregar tarea */}
                <PopUp isVisible={visible}>
                  <Form submit={handleSubmit} />
                </PopUp>

                {/* PopUp para modificar tarea, tiene formulario normal, no el mio */}
                <PopUp isVisible={vispop2}>
                  {" "}
                  {/*he visto esto en un video*/}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSubmit(
                        currentTask.title,
                        currentTask.description,
                        currentTask.date
                      );
                    }}
                  >
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={currentTask.title}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      maxLength={94}
                      value={currentTask.description}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      className="normal"
                      type="text"
                      maxLength={10}
                      value={currentTask.date}
                      onChange={(e) =>
                        setCurrentTask({
                          ...currentTask,
                          date: e.target.value,
                        })
                      }
                    />
                    <button type="submit" className="Form-button">
                      Save Changes
                    </button>
                  </form>
                </PopUp>

                {/* Botones para cambiar el filtro */}
                <div className="filtros">
                  <Button onClick={() => setFilter(Filter.All)}>All</Button>
                  <Button onClick={() => setFilter(Filter.Done)}>Done</Button>
                  <Button onClick={() => setFilter(Filter.NotDone)}>
                    To Do
                  </Button>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Search task"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="Form-button"
                    onClick={() => setFilter(Filter.name)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </aside>
            <section>
              <h1>Task Manager</h1>
              <div className="recuadroTareas">{showList()}</div>
            </section>
          </div>
        </main>
        <div className="calendario">
          <Calendar
            localizer={localizer}
            events={events} // Los eventos convertidos a formato compatible
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title" // Esto asegura que se muestre el título en la celda del evento
            style={{ height: 500, width: 700 }} // Tamaño del calendario
          />
        </div>
        <footer className="footer">
          <p>
            © 2025 Adrián Caballero Torrebejano. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}
