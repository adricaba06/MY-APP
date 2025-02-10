import React, { use, useState } from 'react'
import Task from './task'
import { taskProps } from './task';
import Button from './button';


// interface TaskListProps{
//     tasks: Array<taskProps>;
// }

// export default function taskList({tasks}: TaskListProps) {

    

//         return (
//             <div>
//                 <h1>Lista de tarea</h1>
//                 {taskList.map((task) => (
//                 <Task key={task.id} {...task} />
//                 ))}
//                 <Button onClick={() => addTask}>
//                     <p>New Task</p>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
//                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
//                     </svg>
//                 </Button>
//             </div>
//         )
//     }
// }
