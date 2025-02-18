import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db/pool';  // Asegúrate de importar el archivo correctamente

interface Task {
  id: number;
  title: string;
  description: string;
  selecionada: boolean;
  done: boolean;
}

// Handler para obtener todas las tareas desde la base de datos
const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Realiza la consulta a la base de datos
    const result = await pool.query('SELECT * FROM todos');
    const todos: Task[] = result.rows;
    return res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

// Este handler maneja las solicitudes GET para obtener todas las tareas
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return await getTodos(req, res);
  }

  res.status(405).json({ message: 'Método no permitido' });
}

// esto es el endpoint de la api que se encarga de obtener todas las tareas de la base de datos
// el endpoint es /api/todos    y se puede acceder a el mediante una peticion GET
// para obtener todas las tareas de la base de datos y devolverlas en formato JSON  en la respuesta de la peticion
// el handler de la api se encarga de manejar las solicitudes GET para obtener todas las tareas