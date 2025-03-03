import { getClient } from "../../../db/pool";
import { NextApiRequest, NextApiResponse } from 'next';

interface Task {
  id: string;
  title: string;
  description: string;
  selecionada: boolean;
  done: boolean;
  date: string;
}

const getTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { todoId } = req.query;

  try {
    // Query para obtener la tarea
    const client = getClient();
    const result = await client.query('SELECT * FROM todos WHERE id = $1', [todoId]);
    const todo = result.rows[0];

    if (!todo) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    return await getTodo(req, res);
  }

  res.status(405).json({ message: 'Método no permitido' });
}
